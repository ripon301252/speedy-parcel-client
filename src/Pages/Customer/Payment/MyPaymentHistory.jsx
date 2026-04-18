import React, { useState } from 'react';
import { useAuth } from '../../../Hooks/useAuth';
// import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Eye } from 'lucide-react';
import { IoTrashOutline } from "react-icons/io5";
import ViewDetailsHistory from './ViewPaymentHistory';
import Swal from 'sweetalert2';

const MyPaymentHistory = () => {
    const { user } = useAuth();
    console.log(user)
    // const axiosPaymentHistory = useAxiosPublic();
    const axiosPaymentHistory = useAxiosSecure();
    const [modalType, setModalType] = useState(null)
    const [viewPaymentHistory, setViewPaymentHistory] = useState(null);
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, refetch } = useQuery({
        queryKey: ['paymentHistory', user?.email, page],
        queryFn: async () => {
            const res = await axiosPaymentHistory.get(`/payment-history?email=${user?.email}&page=${page}&limit=${limit}`);
            return res.data;
        }
    })


    const payments = data?.data ?? [];
    const total = data?.total ?? 0;


    const handleViewDetailsHistory = (payment) => {
        setViewPaymentHistory(payment);
        setModalType("view");
    };



    return (
        <div className="p-2 md:p-6">
            <h1 className="text-xl md:text-3xl font-bold mb-4">
                Payment History : {payments.length}
            </h1>
            <h1 className="text-xl md:text-3xl font-bold mb-4">
                total History : {total}
            </h1>
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
                                    <span className="text-green-500">
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
                                        {/* <button
                                            onClick={() => handlePaymentDelete(payment._id)}
                                            className="btn btn-outline btn-square text-[#f87171] hover:bg-[#f87171] hover:text-gray-800">
                                            <IoTrashOutline className='text-lg' />
                                        </button> */}
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
                            {/* <button
                                onClick={() => handlePaymentDelete(payment._id)}
                                className="btn btn-xs btn-error"
                            >
                                Delete
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>

            {modalType === "view" && (
                <ViewDetailsHistory
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

export default MyPaymentHistory;

