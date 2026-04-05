import React from 'react';
import { Link, useNavigate } from 'react-router';
import { XCircleIcon } from '@heroicons/react/24/solid';

const PaymentCancelModal = () => {
    const navigate = useNavigate();
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-6 sm:p-10 text-center relative">
                <XCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4 animate-pulse" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Payment Cancelled</h2>
                <p className="text-gray-600 mb-6">
                    Your payment was not completed. Please try again or contact support if the issue persists.
                </p>
                <div className='flex justify-center gap-4'>
                    <Link to="/my-parcels">
                        <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-12 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
                            Try Again
                        </button>
                    </Link>

                    <button
                        onClick={() => navigate('/my-parcels')}
                        className=" bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 font-semibold py-2 px-14  rounded-lg transition-all duration-300"
                    >
                        Cancel
                    </button>
                </div>

            </div>
        </div>
    );
};

export default PaymentCancelModal;