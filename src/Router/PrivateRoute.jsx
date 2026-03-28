import React from 'react';
import { useAuth } from '../Hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useAuth();
    
     if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if(!user){
        return <Navigate to={`/login`}></Navigate>
    }

    return children;
};

export default PrivateRoute;