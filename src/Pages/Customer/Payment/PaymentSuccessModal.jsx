import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from "react-router";

const PaymentSuccessModal = () => {
    const [paymentInfo, setPaymentInfo] = useState({});
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosPayment = useAxiosPublic();
    const navigate = useNavigate();


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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-3 sm:px-6">

            <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-2xl w-full max-w-sm sm:max-w-md p-5 sm:p-8 text-center relative">

                {/* Icon */}
                <CheckCircleIcon className="w-14 h-14 sm:w-16 sm:h-16 text-green-500 mx-auto mb-4 animate-bounce" />

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    Payment Successful!
                </h2>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-5">
                    Your transaction has been completed successfully.
                </p>

                {/* Info Box */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3 sm:p-4 mb-5 text-left">
                    <p className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm break-all">
                        <span className="font-semibold">Transaction ID:</span>{" "}
                        {paymentInfo.transactionId || "Loading..."}
                    </p>

                    <p className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm break-all mt-1">
                        <span className="font-semibold">Tracking ID:</span>{" "}
                        {paymentInfo.trackingId || "Loading..."}
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">

                    <Link to="/my-parcels" className="w-full">
                        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition shadow-md">
                            Go To My Parcels
                        </button>
                    </Link>

                    <button
                        onClick={() => navigate("/my-parcels")}
                        className="w-full sm:w-auto bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 font-semibold py-2.5 px-6 rounded-lg transition"
                    >
                        Cancel
                    </button>

                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessModal;