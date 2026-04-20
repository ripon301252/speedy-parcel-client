import React, { useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';


const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosCompletedDelivery = useAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 10;

    // const { data: parcels =[], refetch } = useQuery({
    //     queryKey: ['parcels', user?.email, page, 'parcel_delivered'],
    //     queryFn: async () => {
    //         const res = await axiosCompletedDelivery.get(
    //             `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered&page=${page}&limit=${limit}`
    //         );
    //         return res.data;
    //     }
    // });


    const { data, refetch } = useQuery({
        queryKey: ['parcels', user?.email, page, 'parcel_delivered'],
        queryFn: async () => {
            const res = await axiosCompletedDelivery.get(
                `/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel_delivered&page=${page}&limit=${limit}`
            );
            return res.data;
        }
    });

    const parcels = data?.data ?? [];


    const calculatePayout = (parcel) => {
        let percentage = 0.75;

        if (parcel.senderDistrict !== parcel.receiverDistrict) {
            percentage = 0.7;
        }

        let payout = parcel.cost * percentage;

        if (parcel.weight > 3) {
            payout += (parcel.weight - 3) * 20;
        }

        return payout;
    };

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
                refetch();;
                Swal.fire({
                    icon: "success",
                    title: "Cash-out Request Sent!",
                    text: `Amount: ${payout} Tk`
                });

            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Failed",
                text: err.message
            });
        }
    };

    const handleCompletedDelete = (id) => {
        console.log("delete", id)
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
                axiosCompletedDelivery.delete(`/parcels/${id}`)
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

    return (
        <div className="p-4 md:p-6 ">

            <h1 className="text-lg md:text-3xl font-bold mb-4 ml-6">
                Completed Deliveries ({parcels.length})
            </h1>

            {/* ================= TABLE (DESKTOP) ================= */}
            <div className="hidden md:block overflow-x-auto max-w-7xl mx-auto  rounded-xl shadow ">
                <table className="table w-full">
                    <thead className=" ">
                        <tr>
                            <th>#</th>
                            <th>Parcel</th>
                            <th>Sender</th>
                            <th>District</th>
                            <th>Date</th>
                            <th>Cost</th>
                            <th>Payout</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.isArray(parcels) && parcels.map((parcel, i) => (
                            <tr key={parcel._id}>
                                <td>{i + 1}</td>
                                <td>{parcel.parcelName}</td>
                                <td className="text-sm">{parcel.senderName}</td>
                                <td className="text-sm">{parcel.senderDistrict}</td>

                                <td className="text-xs">
                                    {new Date(parcel.createdAt).toLocaleString("en-BD", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </td>

                                <td>{parcel.cost} Tk</td>
                                <td>{calculatePayout(parcel)} Tk</td>

                                <td>
                                    <div className='flex gap-2'>
                                        {parcel.status === "pending" ? (
                                            <button onClick={() => handleCashOut(parcel)} className="btn btn-success btn-sm">
                                                Cash Out
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleCompletedDelete(parcel._id)}
                                                className="btn btn-sm btn-error">
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* pagination */}
                <div className="flex justify-center gap-3 mt-4">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="btn btn-sm"
                    >
                        Prev
                    </button>

                    <span className="px-3 py-1 border rounded">
                        Page {page}
                    </span>

                    <button
                        onClick={() => setPage(page + 1)}
                        className="btn btn-sm"
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* ================= MOBILE CARDS ================= */}
            <div className="grid grid-cols-1 gap-4 md:hidden text-gray-800">

                {parcels.map((parcel, i) => (
                    <div key={parcel._id} className="bg-white border rounded-xl shadow p-4">

                        <div className="flex justify-between">
                            <h2 className="font-bold">
                                #{i + 1} {parcel.parcelName}
                            </h2>
                            <span className="text-xs text-gray-500">
                                {new Date(parcel.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="text-sm mt-2 space-y-1">
                            <p><b>Sender:</b> {parcel.senderName}</p>
                            <p><b>Cost:</b> {parcel.cost} Tk</p>
                            <p><b>Payout:</b> {calculatePayout(parcel)} Tk</p>
                        </div>

                        <div className="flex items-center gap-2 mt-3">

                            {parcel.status === "pending" ? (<button
                                onClick={() => handleCashOut(parcel)}
                                className=" btn btn-success btn-sm"
                            >
                                Cash Out
                            </button>): (<button
                                onClick={() => handleCompletedDelete(parcel._id)}
                                className="btn btn-sm btn-error">
                                Delete
                            </button>)
                            }
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );
};

export default CompletedDeliveries;