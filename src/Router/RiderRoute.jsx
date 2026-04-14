import React from 'react';
import { useAuth } from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Forbidden from '../Pages/Fobidden';

const RiderRoute = ({ children }) => {
    const { loading: riderLoading, user } = useAuth();
    const { role, roleLoading } = useRole();

    if (riderLoading || !user || roleLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-green-500"></span>
            </div>
        );
    }

    if (role !== 'rider') {
        return <Forbidden />
    }

    return children
};

export default RiderRoute;