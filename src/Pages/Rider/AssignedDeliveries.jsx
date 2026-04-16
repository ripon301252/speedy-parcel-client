import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useAuth } from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Eye } from 'lucide-react';
import { MdAccessibleForward, MdNotAccessible } from "react-icons/md";
import { MdCheckCircle, MdCancel, MdLocalShipping, } from "react-icons/md";

const AssignedDeliveries = () => {
    const { user } = useAuth();
    const axiosAssignedDelivery = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosAssignedDelivery.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`,)
            return res.data;
        }
    })
    // console.log(parcels);


    const handleDeliveryStatusUpdate = (parcel, status) => {
        const deliveryStatusInfo = {
            deliveryStatus: status,
            riderId: parcel.riderId,
            trackingId: parcel.trackingId
        }

        let message = `Parcel Status is Updated with ${status.split("_").join(' ')}`

        axiosAssignedDelivery.patch(`/parcels/${parcel._id}/deliveryStatus`, deliveryStatusInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    // const handleRejectDelivery = (parcel) => {
    //     const deliveryStatusInfo = {
    //         deliveryStatus: "rider_rejected",
    //     }
    //     axiosAssignedDelivery.patch(`/parcels/${parcel._id}/deliveryStatus`, deliveryStatusInfo)
    //         .then(res => {
    //             if (res.data.modifiedCount) {
    //                 refetch();
    //                 Swal.fire({
    //                     position: "top-center",
    //                     icon: "success",
    //                     title: "Delivery rejected successfully",
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 });
    //             }
    //         })
    // }

    return (
        <div>
            <h1>Parcels Pending Pickup : {parcels.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Sender Info</th>
                            <th>Receiver Info</th>
                            <th>Parcel Name</th>
                            <th>Confirm</th>
                            <th> Other Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, i) => <tr key={parcel._id}>
                            <th>
                                {i + 1}
                            </th>
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
                                        <div className="text-sm opacity-50">
                                            <span>{parcel.senderRegion}, </span>
                                            <span>{parcel.senderDistrict}, </span>
                                            <span>{parcel.senderArea}</span>
                                        </div>
                                        <div>
                                            {parcel.senderEmail}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div className="font-bold">{parcel.receiverName}</div>
                                    <div className="text-sm opacity-50">
                                        <span>{parcel.receiverRegion}, </span>
                                        <span>{parcel.receiverDistrict}, </span>
                                        <span>{parcel.receiverArea}</span>
                                    </div>
                                    <div>
                                        {parcel.senderEmail}
                                    </div>
                                </div>
                            </td>
                            <td>{parcel.parcelName}</td>
                            <td>
                                {parcel.deliveryStatus === "driver_assigned" ? (
                                    <div className="flex gap-2">

                                        {/* Accept */}
                                        <div className="tooltip tooltip-bottom" data-tip="Accept Delivery">
                                            <button
                                                onClick={() =>
                                                    handleDeliveryStatusUpdate(parcel, "rider_accepted")
                                                }
                                                className="btn btn-outline btn-square text-green-600 hover:bg-green-600 hover:text-white transition"
                                            >
                                                <MdCheckCircle className="text-xl" />
                                            </button>
                                        </div>

                                        {/* Reject */}
                                        <div className="tooltip tooltip-bottom" data-tip="Reject Delivery">
                                            <button
                                                onClick={() =>
                                                    handleDeliveryStatusUpdate(parcel, "rider_rejected")
                                                }
                                                className="btn btn-outline btn-square text-red-600 hover:bg-red-600 hover:text-white transition"
                                            >
                                                <MdCancel className="text-xl" />
                                            </button>
                                        </div>

                                    </div>
                                ) : (
                                    <div className="tooltip tooltip-bottom" data-tip="Accept Success">
                                        <MdCheckCircle className="text-green-600 text-2xl" />
                                    </div>
                                )}
                            </td>
                            <th>
                                <div className='flex gap-3'>
                                    <div>
                                        {parcel.deliveryStatus !== "parcel_picked_up" ? (
                                            <div className="tooltip tooltip-bottom" data-tip="Parcel Picked-Up">
                                                <button
                                                    onClick={() =>
                                                        handleDeliveryStatusUpdate(parcel, "parcel_picked_up")
                                                    }
                                                    className="btn btn-outline btn-square text-orange-600 hover:bg-orange-600 hover:text-white transition"
                                                >
                                                    <MdLocalShipping className="text-xl" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="tooltip tooltip-bottom mt-1" data-tip="Picked-Up Success">
                                                <span className="text-green-600 font-semibold"><MdCheckCircle className="text-2xl" /></span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="tooltip tooltip-bottom" data-tip="Parcel Delivered">
                                        <button
                                            onClick={() => handleDeliveryStatusUpdate(parcel, "parcel_delivered")}
                                            className='btn btn-outline btn-square text-green-600 hover:bg-green-600 hover:text-white transition'
                                        >
                                            <MdCheckCircle className="text-xl" />
                                        </button>
                                    </div>
                                </div>
                            </th>
                            
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedDeliveries;