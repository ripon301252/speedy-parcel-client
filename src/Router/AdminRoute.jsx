import React from 'react';
import { useAuth } from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Forbidden from '../Pages/Fobidden';

const AdminRoute = ({ children }) => {
    const { loading: adminLoading } = useAuth();
    const { role, roleLoading } = useRole();

    if (adminLoading || roleLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-green-500"></span>
            </div>
        );
    }

    if (role !== 'admin') {
        return <Forbidden />
    }

    return children
};

export default AdminRoute;