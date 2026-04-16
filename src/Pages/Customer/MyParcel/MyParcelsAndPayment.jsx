import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useAuth } from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import ModalOTP from '../Payment/ModalOTP';
import { toast } from 'react-toastify';
import { Link } from 'react-router';
import ViewDetails from './ViewDetails';
import { Eye, Send } from 'lucide-react';
import { IoTrashOutline } from "react-icons/io5";



const MyParcelsAndPayment = () => {
    const { user } = useAuth();
    // console.log(user)
    const axiosMyParcels = useAxiosSecure()

    const [payingParcelId, setPayingParcelId] = useState(null);
    const [modalType, setModalType] = useState(null)
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [viewParcel, setViewParcel] = useState(null);

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

        // const idToken = await user.getIdToken(); // ✅ Firebase token

        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
            senderName: parcel.senderName,
            senderAddress: parcel.senderAddress,
            senderPhoto: parcel.senderPhoto,
            trackingId: parcel.trackingId   //new
        };

        try {
            const res = await axiosMyParcels.post('/stripe-payment', paymentInfo, {
                // headers: {
                //     Authorization: `Bearer ${idToken}`, // ✅ send token
                // },
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

    const handleViewDetails = (parcel) => {
        setViewParcel(parcel);
        setModalType("view");
    };

    return (
        <div className="p-2 md:p-6">
            <h1 className="text-lg md:text-2xl font-bold mb-4">
                All of my parcels : {parcels.length}
            </h1>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Sender Name</th>
                            <th>Parcel Name</th>
                            <th>Tracking Id</th>
                            <th>Weight</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {parcels.map((parcel, i) => (
                            <tr key={parcel._id} className="hover:bg-base-200">
                                <th>{i + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-14 w-14">
                                                <img
                                                    src={parcel.senderPhoto}
                                                    alt="" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{parcel.senderName}</div>
                                            <div className="text-sm opacity-50">{parcel.senderAddress}</div>
                                            <div className="text-sm opacity-50">{parcel.senderEmail}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{parcel.parcelName}</td>
                                <td>
                                    <Link to={`/parcel-tracking/${parcel.trackingId}`}>
                                        <p className='text-green-400'>{parcel.trackingId}</p>
                                    </Link> 
                                    
                                </td>

                                <td>{parcel.parcelWeight} Kg</td>
                                <td>{parcel.cost} Tk</td>

                                <td>
                                    {parcel.paymentStatus === "paid" ? (
                                        <span className="text-green-500 font-semibold">Paid</span>
                                    ) : (
                                        <button
                                            onClick={() => handlePayClick(parcel)}
                                            className="btn btn-xs btn-accent"
                                            disabled={payingParcelId === parcel._id}
                                        >
                                            {payingParcelId === parcel._id ? (
                                                <span className="loading loading-spinner loading-xs" />
                                            ) : (
                                                "Pay"
                                            )}
                                        </button>
                                    )}
                                </td>

                                <td>
                                    <p
                                        className={`text-center py-0.5 rounded-lg font-medium
                                            ${parcel.deliveryStatus === "pending-pickup" && "text-yellow-600 bg-yellow-100"}
                                            ${parcel.deliveryStatus === "driver_assigned" && "text-blue-600 bg-blue-100"}
                                            ${parcel.deliveryStatus === "rider_accepted" && "text-indigo-600 bg-indigo-100"}
                                            ${parcel.deliveryStatus === "rider_rejected" && "text-red-600 bg-red-100"}
                                            ${parcel.deliveryStatus === "parcel_picked_up" && "text-orange-600 bg-orange-100"}
                                            ${parcel.deliveryStatus === "parcel_delivered" && "text-green-600 bg-green-100"}
                                            ${!parcel.deliveryStatus && "text-red-600 bg-red-100"}
                                        `}
                                    >
                                        {parcel.deliveryStatus || "payment-pending"}
                                    </p>
                                </td>

                                <td className="flex justify-start items-center gap-3 whitespace-nowrap">
                                    <div
                                        className="relative overflow-visible tooltip tooltip-bottom"
                                        data-tip="View Details"
                                    >
                                        <button
                                            onClick={() => handleViewDetails(parcel)}
                                            className="btn btn-outline btn-square text-blue-500 hover:bg-blue-500 hover:text-black"
                                        >
                                            <Eye className="text-xs" />
                                        </button>
                                    </div>

                                    <div
                                        className="relative overflow-visible tooltip tooltip-bottom"
                                        data-tip="Send Parcel"
                                    >
                                        <Link to={`/send-parcel`} className="btn btn-outline btn-square text-green-500 hover:bg-green-500 hover:text-black">
                                            <Send className="text-xs" />
                                        </Link>
                                    </div>

                                    <div className="relative overflow-visible tooltip tooltip-bottom "
                                        data-tip="Remove">
                                        <button
                                            onClick={() => handleParcelDelete(parcel._id)}
                                            className="btn btn-outline btn-square text-[#f87171] hover:bg-[#f87171] hover:text-black"
                                        >
                                            <IoTrashOutline className="text-lg" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {parcels.map((parcel, i) => (
                    <div
                        key={parcel._id}
                        className="border rounded-lg p-4 shadow bg-base-100"
                    >
                        <div className="flex justify-between">
                            <h2 className="font-bold">#{i + 1} {parcel.parcelName}</h2>
                            {parcel.paymentStatus === "paid" ? (
                                <span className="text-green-500 font-semibold">Paid</span>
                            ) : (
                                <button
                                    onClick={() => handlePayClick(parcel)}
                                    className="btn btn-xs btn-accent"
                                    disabled={payingParcelId === parcel._id}
                                >
                                    {payingParcelId === parcel._id ? "..." : "Pay"}
                                </button>
                            )}
                        </div>

                        <p className="text-sm mt-1">
                            <b>Sender:</b> {parcel.senderName}
                        </p>
                        <p className="text-sm">
                            <b>Email:</b> {parcel.senderEmail}
                        </p>
                        <p className="text-sm">
                            <b>Weight:</b> {parcel.parcelWeight} Kg
                        </p>
                        <p className="text-sm">
                            <b>Cost:</b> {parcel.cost} Tk
                        </p>

                        <div className="flex gap-2 mt-3">
                            <button onClick={() => handleViewDetails(parcel)}
                                className="btn btn-xs btn-primary">
                                View
                            </button>
                            <Link to={`/send-parcel`} className="btn btn-xs btn-secondary">Send</Link>
                            <button
                                onClick={() => handleParcelDelete(parcel._id)}
                                className="btn btn-xs btn-error"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {modalType === "OTP" && (
                <ModalOTP
                    onClose={() => {
                        setModalType(null);
                        setPayingParcelId(null);
                    }}
                    onVerify={handleOtpVerify}
                />
            )}

            {modalType === "view" && (
                <ViewDetails
                    parcel={viewParcel}
                    onClose={() => {
                        setModalType(null);
                        setViewParcel(null);
                    }}
                />
            )}
        </div>
    );


};

export default MyParcelsAndPayment;