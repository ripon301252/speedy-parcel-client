import React, { useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosCompletedDelivery = useAxiosSecure();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['parcels', user.email, 'driver_assigned'],
        queryFn: async () => {
            const res = await axiosCompletedDelivery.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered`,)
            return res.data;
        }
    })

    const calculatePayout = (parcel) => {
        let percentage = 0;

        if (parcel.senderArea === parcel.receiverArea) {
            percentage = 0.8;
        } else if (parcel.senderDistrict === parcel.receiverDistrict) {
            percentage = 0.75; // little increase
        } else {
            percentage = 0.7; // increase for fairness
        }

        let payout = parcel.cost * percentage;

        // extra weight bonus
        if (parcel.weight > 3) {
            payout += (parcel.weight - 3) * 20;
        }

        return payout;
    };

    // const handleCashOut = async (parcel) => {
    //     try {
    //         const payout = calculatePayout(parcel);

    //         const res = await axiosCompletedDelivery.post("/cash-out", {
    //             riderEmail: user.email,
    //             parcelId: parcel._id,
    //             amount: payout
    //         });

    //         if (res.data.insertedId) {
    //             alert("Cash-out request sent!");
    //             refetch();
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    const handleCashOut = async (parcel) => {
        try {
            const payout = calculatePayout(parcel);

            const res = await axiosCompletedDelivery.post("/cash-out", {
                riderEmail: user.email,
                riderPhoto: user.photoURL,
                riderName: user.displayName,
                parcelId: parcel._id,
                amount: payout,
                riderDistrict: parcel.senderDistrict,
                riderArea: parcel.senderArea
            });

            if (res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: "Cash-out Request Sent!",
                    html: `
                        <p>Your request is pending approval</p>
                        <h3 style="color:green; margin-top:10px;">Your amount is ${payout} Tk</h3>
                    `,
                });

                refetch();
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Cashout Failed",
                text: err.response?.data?.message || "Something went wrong",
                confirmButtonColor: "#ef4444"
            });
        }
    };

    return (
        <div>
            <h1 className='text-4xl'> Completed Delivery : {parcels.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>Sender Info</th>
                            <th>Pickup District</th>
                            <th>Date & Time</th>
                            <th>Cost</th>
                            <th>Payout</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, i) => <tr key={parcel._id}>
                            <th>{i + 1}</th>
                            <td>{parcel.parcelName}</td>

                            <td>
                                <div className="flex items-center gap-3">
                                    <img
                                        className="w-10 h-10 rounded-full"
                                        src={parcel.senderPhoto}
                                        alt=""
                                    />
                                    <div>
                                        <p className="font-bold">{parcel.senderName}</p>
                                        <p className="text-xs opacity-50">{parcel.senderEmail}</p>
                                    </div>
                                </div>
                            </td>

                            <td>
                                <div>
                                    {parcel.senderRegion}
                                </div>
                                <div className='flex gap-1'>
                                    <div className="font-bold opacity-70">{parcel.senderDistrict} ,</div>
                                    <div className="text-sm opacity-50">{parcel.senderArea}</div>
                                </div>
                            </td>
                            <td className="text-xs">
                                {new Date(parcel.createdAt).toLocaleString("en-BD", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}
                            </td>
                            <td>{parcel.cost} Tk</td>
                            <td>{calculatePayout(parcel)} Tk</td>

                            <td>
                                <button
                                    onClick={() => handleCashOut(parcel)}
                                    className='btn btn-sm btn-success'
                                >
                                    Cash Out
                                </button>
                            </td>
                        </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDeliveries;