import React, { } from 'react';
import { useAuth } from '../../../Hooks/useAuth';
// import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyPaymentHistory = () => {
    const { user } = useAuth();
    console.log(user)
    // const axiosPaymentHistory = useAxiosPublic();
    const axiosPaymentHistory = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['paymentHistory', user?.email],
        queryFn: async () => {
            const res = await axiosPaymentHistory.get(`/payment-history?email=${user?.email}`);
            return res.data;
        }
    })

    return (
        <div>
            <h1 className='text-4xl '>Payment History : {payments.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Sender Name</th>
                            <th>Customer Email</th>
                            <th>Parcel Name</th>
                            <th>Amount</th>
                            <th>Transaction Id</th>
                            <th>Tracking Id</th>
                            <th>paymentStatus</th>
                            <th>paidDate</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, i) => <tr key={payment._id}>
                                <th>{i + 1}</th>
                                <td>
                                    <div>
                                        <div className="font-bold">{payment.senderName}</div>
                                        <div className="text-sm opacity-50">{payment.senderAddress}</div>
                                    </div>
                                </td>
                                <td>{payment.customerEmail}</td>
                                <td>{payment.parcelName}</td>
                                <td>{payment.amount} Tk.</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.trackingId}</td>
                                <td>{payment.paymentStatus}</td>
                                <td>{payment.paidDate}</td>
                                <td>
                                    <div>
                                        <button className='btn btn-outline'>View</button>
                                    </div>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyPaymentHistory;

