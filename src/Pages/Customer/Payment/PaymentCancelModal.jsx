import React from 'react';
import { Link, useNavigate } from 'react-router';
import { XCircleIcon } from '@heroicons/react/24/solid';

const PaymentCancelModal = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-3">
      
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-5 sm:p-8 text-center relative">
        
        <XCircleIcon className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 mx-auto mb-3 animate-pulse" />
        
        <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h2>
        
        <p className="text-sm sm:text-base text-gray-600 mb-5">
          Your payment was not completed. Please try again or contact support if the issue persists.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          
          <Link to="/my-parcels" className="w-full">
            <button className="w-full text-base sm:text-sm bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
              Try Again
            </button>
          </Link>

          <button
            onClick={() => navigate('/my-parcels')}
            className="w-full text-base sm:text-sm bg-gray-200 hover:bg-red-500 hover:text-white text-gray-700 font-semibold py-2 rounded-lg transition-all duration-300"
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
};

export default PaymentCancelModal;