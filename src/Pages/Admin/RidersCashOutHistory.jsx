import React, { useRef, useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Eye } from 'lucide-react';
import { IoTrashOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

const RidersCashOutHistory = () => {
    const [selectedCashOut, setSelectedCashOut] = useState(null);
    const { user } = useAuth();
    console.log(user)
    const axiosCashOut = useAxiosSecure();
    const cashOutModalRef = useRef();
    const [searchText, setSearchText] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, refetch } = useQuery({
        queryKey: ['cashOuts', user?.email, searchText, status, page],
        queryFn: async () => {
            const url = `/cash-out?searchText=${searchText}&status=${status}&page=${page}&limit=${limit}`
            const res = await axiosCashOut.get(url)
            console.log(res)
            return (await res).data;
        }
    })
    const cashOuts = data?.data || [];
    const total = data?.total ?? 0;

    const handleCashOutDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This cash-out request will be deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosCashOut.delete(`/cash-out/${id}`)
                    .then(res => {
                        console.log("deleted:", res.data);

                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                "Deleted!",
                                "Cash-out request removed successfully.",
                                "success"
                            );
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        Swal.fire("Error", "Something went wrong", "error");
                    });
            }
        });
    };

    const handleApproveCashOut = (id) => {
        Swal.fire({
            title: "Approve Cash Out?",
            text: "This will mark the request as approved.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, approve it",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosCashOut.patch(`/cash-out/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire("Approved!", "Cash-out approved.", "success");
                        }
                    })
                    .catch(() => {
                        Swal.fire("Error", "Something went wrong", "error");
                    });
            }
        });
    };


    const handleRejectCashOut = (id) => {
        Swal.fire({
            title: "Reject Cash Out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reject it",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosCashOut.patch(`/cash-out/reject/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire("Rejected!", "", "success");
                        }
                    })
            }
        });
    };

    const handleCashOutRiderModal = (cashOut) => {
        setSelectedCashOut(cashOut);
        cashOutModalRef.current.showModal();
    }


    return (
        <div>
            <div className="p-2 md:p-6">
                <h1 className="text-xl md:text-3xl font-bold mb-4">
                   All CashOut History : {cashOuts.length}
                </h1>
                <h1 className="text-xl md:text-lg opacity-20 font-bold mb-4">
                    Total Records : {total}
                </h1>

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
                            <option className='bg-white text-gray-800' value="">All Status</option>
                            <option className='bg-white text-gray-800' value="pending">Pending</option>
                            <option className='bg-white text-gray-800' value="approved">Approved</option>
                            <option className='bg-white text-gray-800' value="rejected">Rejected</option>
                        </select>
                    </div>
                </div>


                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Amount</th>
                                <th>Transaction</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cashOuts.map((cashOut, i) => (
                                <tr key={cashOut._id} className="hover">
                                    <th>{i + 1}</th>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={cashOut.riderPhoto}
                                                className="w-10 h-10 rounded-lg"
                                            />
                                            <div>
                                                <p className="font-bold">{cashOut.riderName}</p>
                                                <p className="text-xs opacity-50">
                                                    {cashOut.riderEmail}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <p className="font-bold">{cashOut.riderDistrict}</p>
                                            <p className="text-xs opacity-50">
                                                {cashOut.riderArea}
                                            </p>
                                        </div>

                                    </td>
                                    <td>{cashOut.amount} Tk</td>
                                    <td className="text-xs">{cashOut.transactionId}</td>

                                    <td>
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-semibold
                                                ${cashOut.status === "pending" && "bg-yellow-100 text-yellow-600"}
                                                ${cashOut.status === "approved" && "bg-green-100 text-green-600"}
                                                ${cashOut.status === "rejected" && "bg-red-100 text-red-600"}
                                                ${cashOut.status === "paid" && "bg-blue-100 text-blue-600"}
                                                `}
                                        >
                                            {cashOut.status || "pending"}
                                        </span>
                                    </td>

                                    <td className="text-xs">
                                        {new Date(cashOut.createdAt).toLocaleString("en-BD", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </td>

                                    <td>
                                        <div className="flex justify-start items-center gap-3 whitespace-nowrap">
                                            <button
                                                onClick={() => handleCashOutRiderModal(cashOut)}
                                                className="btn btn-outline btn-square text-blue-500"
                                            >
                                                <Eye className='text-xs' />
                                            </button>

                                            {/* Approve */}
                                            {cashOut.status !== "approved" && (
                                                <button
                                                    onClick={() => handleApproveCashOut(cashOut._id)}
                                                    className="btn btn-outline btn-square text-green-500"
                                                >
                                                    ✔
                                                </button>
                                            )}

                                            {/* Reject */}
                                            {cashOut.status !== "rejected" && (
                                                <button
                                                    onClick={() => handleRejectCashOut(cashOut._id)}
                                                    className="btn btn-outline btn-square text-red-500"
                                                >
                                                    ✖
                                                </button>
                                            )}

                                            <button
                                                onClick={() => handleCashOutDelete(cashOut._id)}
                                                className="btn btn-outline btn-square text-red-400"
                                            >
                                                <IoTrashOutline />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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
            </div>

            {/* Mobile Cards */}
            <div className="grid gap-4 md:hidden">
                {cashOuts.map((cashOut, i) => (
                    <div
                        key={cashOut._id}
                        className="border rounded-xl p-4 shadow bg-base-100"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="font-bold text-sm">
                                #{i + 1} {cashOut.parcelName}
                            </h2>

                            <span className={`badge ${cashOut.cashOutStatus === "paid"
                                ? "badge-success"
                                : "badge-warning"
                                }`}>
                                {cashOut.cashOutStatus}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 mb-2">
                            <img
                                src={cashOut.riderPhoto}
                                className="w-10 h-10 rounded-lg"
                            />
                            <div>
                                <p className="font-semibold text-sm">
                                    {cashOut.senderName}
                                </p>
                                <p className="text-xs opacity-50">
                                    {cashOut.senderAddress}
                                </p>
                            </div>
                        </div>

                        <p className="text-sm"><b>Email:</b> {cashOut.customerEmail}</p>
                        <p className="text-sm"><b>Amount:</b> {cashOut.amount} Tk</p>

                        <p className="text-sm break-all">
                            <b>Transaction:</b> {cashOut.transactionId}
                        </p>

                        <p className="text-sm">
                            <b>Tracking:</b> {cashOut.trackingId || "Not Assigned"}
                        </p>

                        <p className="text-xs mt-1 text-gray-500">
                            {new Date(cashOut.createdAt).toLocaleString("en-BD", {
                                dateStyle: "medium",
                                timeStyle: "short",
                            })}
                        </p>

                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={() => handleCashOutRiderModal(cashOut)}
                                className="btn btn-xs btn-primary">
                                View
                            </button>
                            <button
                                onClick={() => handleCashOutDelete(cashOut._id)}
                                className="btn btn-xs btn-error"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <dialog ref={cashOutModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box w-full max-w-md sm:max-w-lg">

                    <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
                        Cash Out Details
                    </h1>

                    {selectedCashOut ? (
                        <div className="space-y-4">

                            {/* Rider Info */}
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-4 text-center sm:text-left">
                                <img
                                    src={selectedCashOut.riderPhoto}
                                    className="w-16 h-16 rounded-full border object-cover"
                                    alt="rider"
                                />
                                <div>
                                    <p className="font-bold text-lg">
                                        {selectedCashOut.riderName}
                                    </p>
                                    <p className="text-sm text-gray-500 break-all">
                                        {selectedCashOut.riderEmail}
                                    </p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className=" p-3 rounded-lg text-sm text-center sm:text-left">
                                📍 {selectedCashOut.riderDistrict}, {selectedCashOut.riderArea}
                            </div>

                            {/* Divider */}
                            <div className="border-t"></div>

                            {/* Details */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">

                                <div>
                                    <p className="font-semibold">Parcel ID</p>
                                    <p className="break-all text-gray-600">
                                        {selectedCashOut.parcelId}
                                    </p>
                                </div>

                                <div>
                                    <p className="font-semibold">Amount</p>
                                    <p className="text-green-600 font-bold text-base">
                                        {selectedCashOut.amount} Tk
                                    </p>
                                </div>

                                <div>
                                    <p className="font-semibold">Transaction ID</p>
                                    <p className="break-all text-blue-500">
                                        {selectedCashOut.transactionId}
                                    </p>
                                </div>

                                <div>
                                    <p className="font-semibold">Status</p>
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-bold inline-block ${selectedCashOut.status === "pending"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : selectedCashOut.status === "paid"
                                                ? "bg-green-100 text-green-600"
                                                : "bg-blue-100 text-blue-600"
                                            }`}
                                    >
                                        {selectedCashOut.status}
                                    </span>
                                </div>

                                <div className="sm:col-span-2">
                                    <p className="font-semibold">Date</p>
                                    <p className="text-gray-600">
                                        {new Date(selectedCashOut.createdAt).toLocaleString("en-BD", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </p>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No data selected</p>
                    )}

                    {/* Close Button */}
                    <div className="modal-action">
                        <form method="dialog" className="w-full sm:w-auto">
                            <button className="btn w-full">Close</button>
                        </form>
                    </div>

                </div>
            </dialog>
        </div>
    );
};

export default RidersCashOutHistory;