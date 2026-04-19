import React, { useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Eye } from 'lucide-react';
import { IoTrashOutline } from 'react-icons/io5';
import ViewPaymentHistory from '../Customer/Payment/ViewPaymentHistory';
// import ViewDetailsHistory from '../';

const AllPaymentHistory = () => {
    const { user } = useAuth();
    console.log(user)
    // const axiosPaymentHistory = useAxiosPublic();
    const axiosPaymentHistory = useAxiosSecure();
    const [modalType, setModalType] = useState(null)
    const [viewPaymentHistory, setViewPaymentHistory] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const limit = 10;


    const { data, refetch } = useQuery({
        queryKey: ['paymentHistory', user?.email, page, searchText, status],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosPaymentHistory.get(
                `/payment-history?searchText=${searchText}&deliveryStatus=${status}&page=${page}&limit=${limit}`
            );
            return res.data;
        }
    });


    const payments = data?.data ?? [];
    console.log(payments)
    const total = data?.total ?? 0;


    const handlePaymentDelete = (id) => {
        console.log("payment delete", id)
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
                axiosPaymentHistory.delete(`/payment-history/${id}`)
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

    const handleViewDetailsHistory = (payment) => {
        setViewPaymentHistory(payment);
        setModalType("view");
    };

    return (
        <div className="p-2 md:p-6">
            <h1 className="text-xl md:text-3xl font-bold mb-4">
               All Payment History : {payments.length}
            </h1>
            <h1 className="text-xl md:text-lg opacity-20 font-bold mb-4">
                Total Records : {total}
            </h1>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-stretch sm:items-center mt-4 mb-8">
                {/* Search */}
                <div className="w-full sm:w-1/2">
                    <label className="input w-full input-class">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
                        <input onChange={(e) => {
                            setSearchText(e.target.value);
                            setPage(1);
                        }} type="search" required placeholder="Search" />
                    </label>
                </div>

                {/* Filter */}
                <div className="w-full sm:w-1/3">
                    <select
                        className="select select-bordered w-full sm:w-1/3 input-class"
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setPage(1);
                        }}
                    >
                        <option value="">All</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Sender</th>
                            {/* <th>Email</th> */}
                            <th>Parcel</th>
                            <th>Amount</th>
                            <th>Transaction</th>
                            <th>Tracking</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.map((payment, i) => (
                            <tr key={payment._id} className="hover">
                                <th>{i + 1}</th>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={payment.senderPhoto}
                                            className="w-10 h-10 rounded-lg"
                                        />
                                        <div>
                                            <p className="font-bold">{payment.senderName}</p>
                                            <p className="text-xs opacity-50">
                                                {payment.senderAddress}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* <td>{payment.customerEmail}</td> */}
                                <td>{payment.parcelName}</td>
                                <td>{payment.amount} Tk</td>
                                <td className="text-xs">{payment.transactionId}</td>

                                <td>
                                    {payment.trackingId || "Not Assigned"}
                                </td>

                                <td>
                                    <span className={`px-2 py-1 rounded text-xs font-semibold
                                        ${payment.paymentStatus === "paid" && "bg-green-100 text-green-600"}
                                        ${payment.paymentStatus === "pending" && "bg-yellow-100 text-yellow-600"}
                                        ${payment.paymentStatus === "failed" && "bg-red-100 text-red-600"}
                                    `}>
                                        {payment.paymentStatus}
                                    </span>
                                </td>

                                <td className="text-xs">
                                    {new Date(payment.paidDate).toLocaleString("en-BD", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </td>

                                <td>
                                    <div className="flex justify-start items-center gap-3 whitespace-nowrap">
                                        <button
                                            onClick={() => handleViewDetailsHistory(payment)}
                                            className="btn btn-outline btn-square text-blue-500 hover:bg-blue-500 hover:text-gray-800">
                                            <Eye className='text-xs' />
                                        </button>
                                        <button
                                            onClick={() => handlePaymentDelete(payment._id)}
                                            className="btn btn-outline btn-square text-[#f87171] hover:bg-[#f87171] hover:text-gray-800">
                                            <IoTrashOutline className='text-lg' />
                                        </button>
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

            {/* Mobile Cards */}
            <div className="grid gap-4 md:hidden">
                {payments.map((payment, i) => (
                    <div
                        key={payment._id}
                        className="border rounded-xl p-4 shadow bg-base-100"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="font-bold text-sm">
                                #{i + 1} {payment.parcelName}
                            </h2>

                            <span className={`badge ${payment.paymentStatus === "paid"
                                ? "badge-success"
                                : "badge-warning"
                                }`}>
                                {payment.paymentStatus}
                            </span>
                        </div>

                        <div className="flex items-center gap-3 mb-2">
                            <img
                                src={payment.senderPhoto}
                                className="w-10 h-10 rounded-lg"
                            />
                            <div>
                                <p className="font-semibold text-sm">
                                    {payment.senderName}
                                </p>
                                <p className="text-xs opacity-50">
                                    {payment.senderAddress}
                                </p>
                            </div>
                        </div>

                        <p className="text-sm"><b>Email:</b> {payment.customerEmail}</p>
                        <p className="text-sm"><b>Amount:</b> {payment.amount} Tk</p>

                        <p className="text-sm break-all">
                            <b>Transaction:</b> {payment.transactionId}
                        </p>

                        <p className="text-sm">
                            <b>Tracking:</b> {payment.trackingId || "Not Assigned"}
                        </p>

                        <p className="text-xs mt-1 text-gray-500">
                            {new Date(payment.paidDate).toLocaleString("en-BD", {
                                dateStyle: "medium",
                                timeStyle: "short",
                            })}
                        </p>

                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={() => handleViewDetailsHistory(payment)}
                                className="btn btn-xs btn-primary">
                                View
                            </button>
                            <button
                                onClick={() => handlePaymentDelete(payment._id)}
                                className="btn btn-xs btn-error"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {modalType === "view" && (
                <ViewPaymentHistory
                    paymentHistory={viewPaymentHistory}
                    onClose={() => {
                        setModalType(null);
                        setViewPaymentHistory(null);
                    }}
                />
            )}

        </div>
    );
};

export default AllPaymentHistory;