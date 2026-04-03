import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const PaymentSuccess = () => {
    const [paymentInfo, setPaymentInfo] = useState({}); 
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosPayment = useAxiosPublic();

    useEffect(() => {
        if (sessionId) {
            axiosPayment.patch(`/payment-check?session_id=${sessionId}`)
                .then(res => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId,
                    }); 
                })
                .catch(err => {
                    console.error("Error updating payment status:", err.message);
                });
        }
    }, [sessionId, axiosPayment]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-6 sm:p-10 text-center">
                <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">
                    Thank you for your payment. Your transaction has been completed successfully.
                </p>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-gray-700"><span className="font-semibold">Transaction ID:</span> {paymentInfo.transactionId || 'Loading...'}</p>
                    <p className="text-gray-700"><span className="font-semibold">Tracking ID:</span> {paymentInfo.trackingId || 'Loading...'}</p>
                </div>

                <Link to="/my-parcels">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                        Go To My Parcels
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;