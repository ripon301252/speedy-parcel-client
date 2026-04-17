import React, { useState } from 'react';
import { useAuth } from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Eye } from 'lucide-react';
import { IoTrashOutline } from 'react-icons/io5';

const CashOutHistory = () => {
    const { user } = useAuth();
    console.log(user)
    const axiosCashOut = useAxiosSecure();
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, refetch } = useQuery({
        queryKey: ['cashOuts', user?.email, page],
        queryFn: async () => {
            const res = await axiosCashOut.get(`/cash-out?email=${user.email}&page=${page}&limit=${limit}`)
            console.log(res)
            return (await res).data;
        }
    })

    const cashOuts = data?.data || [];

    return (
        <div>
            <div className="p-2 md:p-6">
                <h1 className="text-xl md:text-3xl font-bold mb-4">
                    cashOut History : {cashOuts.length}
                </h1>
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
                                        <span className="text-green-500">
                                            {cashOut.status}
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
                                                // onClick={() => handleViewDetailsHistory(cashOut)}
                                                className="btn btn-outline btn-square text-blue-500 hover:bg-blue-500 hover:text-gray-800">
                                                <Eye className='text-xs' />
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
                                    src={cashOut.senderPhoto}
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
                                {new Date(cashOut.paidDate).toLocaleString("en-BD", {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                })}
                            </p>

                            {/* <div className="flex gap-2 mt-3">
                                <button
                                    // onClick={() => handleViewDetailsHistory(cashOut)}
                                    className="btn btn-xs btn-primary">
                                    View
                                </button>
                                <button
                                    // onClick={() => handlecashOutDelete(cashOut._id)}
                                    className="btn btn-xs btn-error"
                                >
                                    Delete
                                </button>
                            </div> */}
                        </div>
                    ))}
                </div>

                {/* {modalType === "view" && (
                    <ViewDetailsHistory
                        cashOutHistory={viewcashOutHistory}
                        onClose={() => {
                            setModalType(null);
                            setViewcashOutHistory(null);
                        }}
                    />
                )} */}

            </div>
        </div>
    );
};

export default CashOutHistory;