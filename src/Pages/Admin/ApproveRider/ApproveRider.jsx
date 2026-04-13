import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Eye, UserRoundPlus, UserRoundX } from 'lucide-react';
import { IoTrashOutline } from "react-icons/io5";


import ViewRider from '../../Rider/ViewRider';


const ApproveRider = () => {
    const [modalType, setModalType] = useState(null);
    const [viewRider, setViewRider] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [status, setStatus] = useState('');
    const axiosApproveRider = useAxiosSecure();
    const { data: riders = [], refetch } = useQuery({
        queryKey: ['riders', 'pending', searchText, status],
        queryFn: async () => {
            const res = await axiosApproveRider.get(`/riders?searchText=${searchText}&status=${status}`);
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

    // const handleApproveRider = (rider) => {
    //     // console.log("approve rider", id)
    //     updateRiderStatus(rider, "approved")
    // }

    const handleApproveRider = (rider) => {
        Swal.fire({
            title: `Approve ${rider.riderName}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Approve"
        }).then(result => {
            if (result.isConfirmed) {
                updateRiderStatus(rider, "approved");
            }
        });
    }

    // const handleRejectRider = (rider) => {
    //     updateRiderStatus(rider, "rejected")
    // }

    const handleRejectRider = (rider) => {
        Swal.fire({
            title: `Reject ${rider.riderName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Reject"
        }).then(result => {
            if (result.isConfirmed) {
                updateRiderStatus(rider, "rejected");
            }
        });
    }

    const handleViewRider = (rider) => {
        setViewRider(rider);
        setModalType("view");
    }

    return (
        <div className='max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-10'>
            <h1 className='text-3xl  lg:text-4xl font-bold'>Manage All Riders</h1>
            {/* <h1 className='text-4xl font-bold'>Rider Control Panel</h1> */}
            <h1 className='text-sm sm:text-base text-green-500 font-bold mt-1'> ({riders.length}) Users Applied To Become Riders.</h1>
            {/* <p>search text : {searchText}</p> */}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-stretch sm:items-center mt-4 mb-8">
                {/* Search */}
                <div className="w-full sm:w-1/2">
                    <label className="input w-full input-class">
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>

                        <input
                            onChange={(e) => setSearchText(e.target.value)}
                            type="search"
                            placeholder="Search"
                            className="w-full"
                        />
                    </label>
                </div>

                {/* Filter */}
                <div className="w-full sm:w-1/3">
                    <select
                        className="select select-bordered w-full input-class"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option className='bg-white' value="">All Status</option>
                        <option className='bg-white' value="pending">Pending</option>
                        <option className='bg-white' value="approved">Approved</option>
                        <option className='bg-white' value="rejected">Rejected</option>
                    </select>
                </div>
            </div>
            <div className="overflow-x-auto w-full ">
                <table className="table overflow-x-auto w-full rounded-lg  min-w-[650px]">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date & Time</th>
                            <th>Work Status</th>
                            <th>Application Status</th>
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
                                            <div className="mask mask-squircle h-10 w-10 md:h-12 md:w-12">
                                                <img src={rider.riderPhoto} alt="PhotoURL" />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="font-bold text-sm md:text-base">
                                                {rider.riderName}
                                            </div>

                                            <span className='text-xs md:text-sm opacity-80'>
                                                {rider.riderRegion}
                                            </span>

                                            <div className="hidden sm:block">
                                                <span className="font-bold opacity-50 mr-2 text-xs">
                                                    {rider.riderDistrict},
                                                </span>
                                                <span className="text-xs opacity-50">
                                                    {rider.riderArea}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {rider.riderEmail}
                                </td>

                                <td className="text-xs">
                                    {new Date(rider.createdAt).toLocaleString("en-BD", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </td>

                                <td>
                                    <span
                                        className={`px-2 py-1 rounded text-white text-xs font-semibold
                                                ${rider.workStatus === "available" && "bg-green-500"}
                                                ${rider.workStatus === "in_delivery" && "bg-yellow-500"}
                                                // ${rider.workStatus === "busy" && "bg-red-500"}
                                            `}
                                        >
                                        {rider.workStatus}
                                    </span>
                                </td>

                                <td>
                                    {/* <p className={`${rider.status === "approved"
                                        ? "bg-green-200 text-green-600 text-center py-1 rounded-lg"
                                        : "bg-orange-200 text-orange-600 text-center py-1 rounded-lg"}`}
                                    >
                                        {rider.status}
                                    </p> */}
                                    <p className={`text-center py-1 rounded-lg w-20 ${rider.status === "approved"
                                        ? "bg-green-200 text-green-600"
                                        : rider.status === "rejected"
                                            ? "bg-red-200 text-red-600"
                                            : "bg-yellow-200 text-yellow-600"
                                        }`}>
                                        {rider.status || "pending"}
                                    </p>
                                </td>

                                <th>
                                    <div className='flex justify-start items-center gap-3 whitespace-nowrap'>
                                        {/* <button className="btn btn-sm">View</button> */}
                                        <div
                                            className="relative overflow-visible tooltip tooltip-bottom"
                                            data-tip="View Details"
                                        >
                                            <button
                                                // to={`/editAsset/${rider._id}`}
                                                onClick={() => handleViewRider(rider)}
                                                className="btn btn-outline btn-square text-blue-500 hover:bg-blue-500 hover:text-gray-800"
                                            >
                                                <Eye className="text-xs" />

                                            </button>
                                        </div>
                                        {/* <button onClick={() => handleApproveRider(rider)} className="btn btn-sm">Accept</button>
                                        <button onClick={() => handleRejectRider(rider)} className="btn btn-sm">Reject</button> */}

                                        {rider.status === 'approved'
                                            ? <div className="tooltip tooltip-bottom" data-tip="Reject">
                                                <button
                                                    onClick={() => handleRejectRider(rider, "rejected")}
                                                    className=" btn btn-square btn-outline  text-[#fcb700] hover:text-gray-800 hover:bg-[#fcb700]"
                                                >
                                                    <UserRoundX className='text-xs' />

                                                </button>
                                            </div>

                                            : <div className="tooltip tooltip-bottom" data-tip="Accept">
                                                <button
                                                    onClick={() => handleApproveRider(rider, "approved")}
                                                    className=" btn btn-square btn-outline text-[#00d390] hover:text-gray-800 hover:bg-[#00d390] "
                                                >
                                                    <UserRoundPlus className='text-xs ' />

                                                </button>
                                            </div>

                                        }
                                        {/* <button onClick={() => handleRiderDelete(rider._id)} className="btn btn-sm">Delete</button> */}
                                        <div className="relative overflow-visible tooltip tooltip-bottom "
                                            data-tip="Remove">
                                            <button
                                                onClick={() => handleRiderDelete(rider._id)}
                                                className="btn btn-outline btn-square text-[#f87171] hover:bg-[#f87171] hover:text-gray-800"
                                            >
                                                <IoTrashOutline className="text-lg" />
                                            </button>
                                        </div>
                                    </div>
                                </th>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>

            {modalType === "view" && (
                <ViewRider
                    riderView={viewRider}
                    onClose={() => {
                        setModalType(null)
                    }}
                />
            )}

        </div>
    );
};

export default ApproveRider;