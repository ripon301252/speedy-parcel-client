import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ApproveRider = () => {
    const axiosApproveRider = useAxiosSecure();
    const { data: riders = [], refetch } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosApproveRider.get('/riders');
            return res.data;
        }
    })

    const handleRiderDelete = (id) => {
        console.log("Delete", id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed)
                axiosApproveRider.delete(`/riders/${id}`)
                    .then(res => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire(
                                "Deleted!",
                                "Your rider has been deleted.",
                                "success"
                            );
                        }
                    })
                    .catch(err => {
                        console.log(err.message);
                        Swal.fire(
                            "Error!",
                            "Failed to delete the rider.",
                            "error"
                        );
                    })
        })
    }

    const updateRiderStatus = (rider, status) => {
        const updateInfo = { status: status, email: rider.riderEmail };
        axiosApproveRider.patch(`/riders/${rider._id}`, updateInfo)
            .then(res => {
                if (res.data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: "top-top",
                        icon: "success",
                        title: `Rider status is set to ${status}`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            })
    }

    const handleApproveRider = (rider) => {
        // console.log("approve rider", id)
        updateRiderStatus(rider, "approved")
    }

    const handleRejectRider = (rider) => {
        updateRiderStatus(rider, "rejected")
    }

    return (
        <div>
            <h2 className='text-4xl'>All Riders: {riders.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            riders.map((rider, i) => <tr key={rider._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={rider.riderPhoto}
                                                    alt="PhotoURL" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{rider.riderName}</div>
                                            <span className='opacity-90'>{rider.riderRegion}</span>
                                            <div>
                                                <span className="font-bold opacity-50 mr-2">{rider.riderDistrict}</span>,
                                                <span className="text-sm opacity-50"> {rider.riderArea}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {rider.riderEmail}
                                </td>
                                <td>
                                    {/* <p className={`${rider.status === "approved"
                                        ? "bg-green-200 text-green-600 text-center py-1 rounded-lg"
                                        : "bg-orange-200 text-orange-600 text-center py-1 rounded-lg"}`}
                                    >
                                        {rider.status}
                                    </p> */}
                                    <p className={`text-center py-1 rounded-lg ${rider.status === "approved"
                                            ? "bg-green-200 text-green-600"
                                            : rider.status === "rejected"
                                                ? "bg-red-200 text-red-600"
                                                : "bg-yellow-200 text-yellow-600"  // ✅ pending
                                        }`}>
                                        {rider.status || "pending"}
                                    </p>

                                </td>

                                <th>
                                    <div className='flex gap-2'>
                                        <button className="btn btn-sm">View</button>
                                        <button onClick={() => handleApproveRider(rider)} className="btn btn-sm">Accept</button>
                                        <button onClick={() => handleRejectRider(rider)} className="btn btn-sm">Reject</button>
                                        <button onClick={() => handleRiderDelete(rider._id)} className="btn btn-sm">Delete</button>
                                    </div>
                                </th>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default ApproveRider;