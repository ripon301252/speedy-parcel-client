import React from 'react';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div>
            <h2>Payment Cancel</h2>
            <p>Your payment was cancelled. Please try again.</p>
            <Link to="/my-parcels">
                <button className='btn btn-outline'>Try Again</button>
            </Link>
        </div>
    );
};

export default PaymentCancel;