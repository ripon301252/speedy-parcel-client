import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useAuth } from '../../../Hooks/useAuth';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import ModalOTP from '../Payment/ModalOTP';
import { toast } from 'react-toastify';



const MyParcelsAndPayment = () => {
    const { user } = useAuth();
    const axiosMyParcels = useAxiosPublic();
    const [modalType, setModalType] = useState(null)
    const [selectedParcel, setSelectedParcel] = useState(null);

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['myParcels', user?.email],
        queryFn: async () => {
            const res = await axiosMyParcels.get(`/parcels?email=${user?.email}`)
            return res.data;
        }
    })


    const handleParcelDelete = (id) => {
        console.log("delete parcel with id:", id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosMyParcels.delete(`/parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            // refetch the data in the UI after deletion
                            refetch();
                            Swal.fire(
                                "Deleted!",
                                "Your parcel has been deleted.",
                                "success"
                            );
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                        Swal.fire(
                            "Error!",
                            "Failed to delete the parcel.",
                            "error"
                        );
                    })
            }
        });
    }


    const handlePayment = async (parcel) => {
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
            senderName: parcel.senderName,
            senderAddress: parcel.senderAddress
        };

        const res = await axiosMyParcels.post('/stripe-payment', paymentInfo);

        window.location.assign(res.data.url);
    };


    const handleOtpVerify = async (enteredOtp) => {
        try {
            const res = await axiosMyParcels.post("/verify-otp", {
                email: user.email,
                otp: Number(enteredOtp), // ✅ must convert to number
            });

            if (res.data.success) {
                toast("OTP Verified");
                handlePayment(selectedParcel);
                setModalType(null);
            }
        } catch (err) {
            toast(err.response?.data?.message || "OTP verification failed");
        }
    };


    const handlePayClick = async (parcel) => {
        setSelectedParcel(parcel);

        try {
            // Send OTP
            await axiosMyParcels.post("/send-otp", { email: user.email });
            setModalType("OTP"); // Open Modal
        } catch (err) {
            toast("Failed to send OTP");
        }
    };

    return (
        <div>
            <h1>All of my parcels : {parcels.length}</h1>
            <div className="overflow-x-auto">
                <table className="table ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Sender Name</th>
                            <th>Sender Email</th>
                            <th>Parcel Name</th>
                            <th>Parcel Weight</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, i) => {
                                console.log(parcel._id);
                                return (
                                    <tr key={parcel._id} className='hover:bg-base-300'>

                                        <th>{i + 1}</th>
                                        <td>{parcel.senderName}</td>
                                        <td>{parcel.senderEmail}</td>
                                        <td>{parcel.parcelName}</td>
                                        <td>{parcel.parcelWeight} Kg</td>
                                        <td>{parcel.cost} Tk</td>
                                        <td>
                                            {
                                                parcel.cost && parcel.paymentStatus === 'paid' ? (
                                                    <span className='text-green-500 font-semibold'>Paid</span>
                                                ) : (
                                                    // <Link to={`/payment/${parcel._id}`} className='btn btn-sm btn-accent rounded-lg'>Pay Now</Link>
                                                    <button onClick={() => handlePayClick(parcel)}
                                                        className='btn btn-sm btn-accent rounded-lg'>Pay Now</button>
                                                )
                                            }
                                        </td>
                                        <td>
                                            <div className='flex gap-3'>
                                                <button className='btn btn-sm btn-primary'>View Details</button>
                                                <button className='btn btn-sm btn-secondary'>send parcel</button>
                                                <button
                                                    onClick={() => handleParcelDelete(parcel._id)}
                                                    className='btn btn-sm btn-secondary'
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            {modalType === "OTP" && (
                <ModalOTP
                    onClose={() => setModalType(null)}
                    onVerify={handleOtpVerify}
                />
            )}
        </div>
    );
};

export default MyParcelsAndPayment;