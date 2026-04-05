import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useAuth } from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import ModalOTP from '../Payment/ModalOTP';
import { toast } from 'react-toastify';



const MyParcelsAndPayment = () => {
    const { user } = useAuth();
    console.log(user)
   
    const [payingParcelId, setPayingParcelId] = useState(null);

    const axiosMyParcels = useAxiosSecure()
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


    // const handlePayment = async (parcel) => {
    //     const paymentInfo = {
    //         cost: parcel.cost,
    //         parcelId: parcel._id,
    //         senderEmail: parcel.senderEmail,
    //         parcelName: parcel.parcelName,
    //         senderName: parcel.senderName,
    //         senderAddress: parcel.senderAddress
    //     };

    //     const res = await axiosMyParcels.post('/stripe-payment', paymentInfo);

    //     window.location.assign(res.data.url);
    // };


    const handlePayment = async (parcel) => {
        if (!user) return toast.error("User not logged in");

        const idToken = await user.getIdToken(); // ✅ Firebase token

        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
            senderName: parcel.senderName,
            senderAddress: parcel.senderAddress,
        };

        try {
            const res = await axiosMyParcels.post('/stripe-payment', paymentInfo, {
                headers: {
                    Authorization: `Bearer ${idToken}`, // ✅ send token
                },
            });

            window.location.assign(res.data.url); // redirect to Stripe
        } catch (err) {
            console.error("Stripe payment error:", err.response?.data || err.message);
            toast.error("Payment failed. Check console.");
        }
    };


    // const handleOtpVerify = async (enteredOtp) => {
    //     try {
    //         const res = await axiosMyParcels.post("/verify-otp", {
    //             email: user.email,
    //             otp: Number(enteredOtp), // ✅ must convert to number
    //         });

    //         if (res.data.success) {
    //             toast("OTP Verified");
    //             handlePayment(selectedParcel);
    //             setModalType(null);
    //         }
    //     } catch (err) {
    //         toast(err.response?.data?.message || "OTP verification failed");
    //     }
    // };

    const handleOtpVerify = async (enteredOtp) => {
        try {
            const res = await axiosMyParcels.post("/verify-otp", {
                email: user.email,
                otp: Number(enteredOtp),
            });

            if (res.data.success) {
                toast("OTP Verified");
                await handlePayment(selectedParcel);
            }
        } catch (err) {
            toast(err.response?.data?.message || "OTP verification failed");
        } finally {
            setModalType(null);       // close modal
            setPayingParcelId(null);  // stop loading
        }
    };


    // const handlePayClick = async (parcel) => {
    //     setSelectedParcel(parcel);
    //     setIsPaying(true); // start loading

    //     try {
    //         // Send OTP
    //         await axiosMyParcels.post("/send-otp", { email: user.email });
    //         setModalType("OTP"); // Open Modal
    //     } catch (err) {
    //         console.error("OTP Error:", err);
    //         const message = err.response?.data?.message || err.message || "Failed to send OTP";
    //         toast.error(message);
    //     }
    // };

    const handlePayClick = async (parcel) => {
        setSelectedParcel(parcel);
        setPayingParcelId(parcel._id); // start loading for this parcel

        try {
            // Send OTP
            await axiosMyParcels.post("/send-otp", { email: user.email });
            setModalType("OTP"); // open OTP modal
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send OTP");
            setPayingParcelId(null); // stop loading if error
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
                                            {/* {
                                                parcel.cost && parcel.paymentStatus === 'paid' ? (
                                                    <span className='text-green-500 font-semibold'>Paid</span>
                                                ) : (
                                                    // <Link to={`/payment/${parcel._id}`} className='btn btn-sm btn-accent rounded-lg'>Pay Now</Link>
                                                    <button onClick={() => handlePayClick(parcel)}
                                                        className='btn btn-sm btn-accent rounded-lg'>Pay Now</button>
                                                )
                                            } */}


                                            {/* {parcel.cost && parcel.paymentStatus === 'paid' ? (
                                                    <span className='text-green-500 font-semibold'>Paid</span>
                                                ) : (
                                                    <button
                                                        onClick={() => handlePayClick(parcel)}
                                                        className='btn btn-sm btn-accent rounded-lg'
                                                        disabled={isPaying} // prevent multiple clicks
                                                    >
                                                        {isPaying ? (
                                                            // <span className="loading loading-spinner loading-sm"></span>
                                                            <span className="loading loading-spinner loading-sm text-info"></span> // spinner while loading
                                                        ) : (
                                                            "Pay Now"
                                                        )}
                                                    </button>
                                                )} */}

                                            {parcel.cost && parcel.paymentStatus === 'paid' ? (
                                                <span className='text-green-500 font-semibold'>Paid</span>
                                            ) : (
                                                <button
                                                    onClick={() => handlePayClick(parcel)}
                                                    className='btn btn-sm btn-accent rounded-lg'
                                                    disabled={payingParcelId === parcel._id} // only disable this row
                                                >
                                                    {payingParcelId === parcel._id ? (
                                                        <span className="loading loading-spinner loading-sm text-success"></span>
                                                    ) : (
                                                        "Pay Now"
                                                    )}
                                                </button>
                                            )}

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
                    onClose={() => {
                        setModalType(null);
                        setPayingParcelId(null); // ✅ cancel করলে loading off
                    }}
                    onVerify={handleOtpVerify}
                />
            )}
        </div>
    );
};

export default MyParcelsAndPayment;