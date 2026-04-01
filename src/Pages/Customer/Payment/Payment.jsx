import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
// import { send } from 'vite';

const Payment = () => {
    const axiosPayment = useAxiosPublic();
    const { parcelId } = useParams();
    console.log(parcelId);
    
    const { isLoading, data: parcel } = useQuery({
        queryKey: ['payment', parcelId],
        queryFn: async () => {
            const res = await axiosPayment.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })
    
    const handlePayment = async () => {
            console.log("handle payment for parcel with id:", parcelId);
            const paymentInfo = {
                cost: parcel.cost,
                parcelId: parcel._id,
                senderEmail: parcel.senderEmail,
                parcelName: parcel.parcelName
            }
            const res = await axiosPayment.post('/stripe-payment', paymentInfo);
           console.log(res.data)
           window.location.href = res.data.url; // Redirect to the Stripe checkout page 
    }



    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg"></span>
        </div>

    }



    return (
        <div>
            <h1 className='text-4xl '>Please Pay ${parcel.cost} For :{parcel?.parcelName}</h1>
            <button 
            onClick={handlePayment} 
            className='btn btn-outline'>Pay</button>

        </div>
    );
};

export default Payment;