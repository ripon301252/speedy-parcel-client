import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    console.log("Payment successful with session ID:", sessionId);
    const axiosPayment = useAxiosPublic();

    useEffect(() => {
        if (sessionId) {
            axiosPayment.patch(`/payment-check?session_id=${sessionId}`)
                .then(res => {
                    console.log("Payment status updated successfully:", res.data);
                })
                .catch(err => {
                    console.error("Error updating payment status:", err.message);
                });
        }
    }, [sessionId, axiosPayment])

    return (
        <div>
            <h2 className='text-4xl'>Payment Success</h2>

            <Link to="/my-parcels">
                <button className='btn btn-outline'>Go To My Parcels</button>
            </Link>
        </div>
    );
};

export default PaymentSuccess;