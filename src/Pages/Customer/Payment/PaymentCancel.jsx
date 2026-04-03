import React from 'react';
import { Link } from 'react-router';
import { XCircleIcon } from '@heroicons/react/24/solid';

const PaymentCancel = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-6 sm:p-10 text-center">
                <XCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Payment Cancelled</h2>
                <p className="text-gray-600 mb-6">
                    Your payment was not completed. Please try again or contact support if the issue persists.
                </p>

                <Link to="/my-parcels">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                        Try Again
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default PaymentCancel;