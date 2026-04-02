import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const PaymentSuccess = () => {
    const [paymentInfo, setPaymentInfo] = useState({}); 
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    console.log("Payment successful with session ID:", sessionId);
    const axiosPayment = useAxiosPublic();

    useEffect(() => {
        if (sessionId) {
            axiosPayment.patch(`/payment-check?session_id=${sessionId}`)
                .then(res => {
                    console.log("Payment status updated successfully:", res.data);
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId,
                        // status: res.data.status
                    }); 
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
                <p>Your transactionId: {paymentInfo.transactionId}</p>
                <p>Your trackingId: {paymentInfo.trackingId}</p>
                {/* <p>Payment Status: {paymentInfo.status}</p> */}
            </Link>
        </div>
    );
};

export default PaymentSuccess;