import React, { useState } from 'react';

import { Link, NavLink } from 'react-router';
import Logo from './Logo';
import { useAuth } from '../Hooks/useAuth';
import { toast } from 'react-toastify';


const Navbar = () => {

    const { user, logOut } = useAuth();

    const activeLinks = ({ isActive }) =>
        `px-4 py-2 rounded-md text-sm font-medium transition-all duration-300
   ${isActive
            ? "text-amber-500 border-b-2 border-amber-500"
            : "text-gray-700 dark:text-gray-200 hover:text-amber-500 hover:scale-105"
        }`;

    const publicLinks = (
        <>
            <NavLink to={`/`} className={activeLinks}>Home</NavLink>
            <NavLink to={`/about`} className={activeLinks}>About</NavLink>
            <NavLink to={`/contact`} className={activeLinks}>Contact</NavLink>
            <NavLink to={`/coverage`} className={activeLinks}>Coverage </NavLink>
            <NavLink to={`/send-parcel`} className={activeLinks}>Send Parcel</NavLink>
            <NavLink to={`/rider`} className={activeLinks}>Be a Rider</NavLink> 65-2
            {/* <NavLink to={`/dashboard`} className={activeLinks}>Dashboard</NavLink> */}
        </>
    )

    const customerLinks = (
        <>
            {/* /dashboard
        /dashboard/my-orders
        /dashboard/track-order/:id
        /dashboard/payment
        /dashboard/profile */}
            <NavLink to={`/send-parcel`} className={activeLinks}>Send Parcel</NavLink>
            <NavLink to={`/my-parcels`} className={activeLinks}>My Parcels & payment</NavLink>
            <NavLink to={`/payment-history`} className={activeLinks}>My Payment History</NavLink>
        </>
    )

    const riderLinks = (
        <>
            {/* /rider
        /rider/pending-deliveries
        /rider/active-delivery
        /rider/delivery-history
        /rider/earnings */}
            <NavLink to={`/rider`} className={activeLinks}>Be a Rider</NavLink>
            <NavLink to={`/Accept-delivery-request`} className={activeLinks}>Accept delivery request </NavLink>
            <NavLink to={`/Update-delivery-status`} className={activeLinks}>Update delivery status </NavLink>
            <NavLink to={`/dashboard`} className={activeLinks}>Dashboard </NavLink>
            <NavLink to={`/send-parcel`} className={activeLinks}>Send Parcel</NavLink>
             <NavLink to={`/my-parcels`} className={activeLinks}>My Parcels & payment</NavLink>
            <NavLink to={`/payment-history`} className={activeLinks}>My Payment History</NavLink>
        </>
    )

    const adminLinks = (
        <>
            {/* /admin
        /admin/users
        /admin/orders
        /admin/assign-rider
        /admin/analytics */}
            <NavLink to={`/Dashboard-analytics`} className={activeLinks}>Dashboard (analytics) </NavLink>
            <NavLink to={`/Manage-users`} className={activeLinks}>Manage users </NavLink>
            <NavLink to={`/Manage-deliveries`} className={activeLinks}>Manage deliveries </NavLink>
            <NavLink to={`/Manage-orders`} className={activeLinks}>Manage orders </NavLink>
            <NavLink to={`/Assign-riders`} className={activeLinks}>Assign riders </NavLink>
            <NavLink to={`/View-reports`} className={activeLinks}>View reports </NavLink>
            <NavLink to={`/coverage`} className={activeLinks}>Coverage </NavLink>
        </>
    )


    const handleLogout = () => {
        logOut()
            .then(() => toast.success("Sign-out successful"))
            .catch((err) => toast.error(err.massage))
    }


    return (
        <nav className='bg-gray-900-100 py-2  border-b border-gray-800 sticky top-0 z-50 backdrop-blur-lg bg-white/10   '>
            <div className='flex justify-between items-center max-w-7xl mx-auto '>
                <div>
                    <Logo></Logo>
                </div>
                <div>
                    <div className='hidden md:flex items-center gap-6'>
                        {!user && publicLinks}
                        {/* {user && role === "rider" && riderLinks}
                        {user && role === "user" && customerLinks}
                        {user && role === "admin" && adminLinks} */}
                        {/* {user && adminLinks} */}
                        {user && riderLinks}
                    </div>
                </div>
                <div>
                    {user ?
                        (<button onClick={handleLogout} className='btn'>Logout</button>)
                        :
                        (<Link to={`/login`} className='btn'>Login</Link>)
                    }
                    {/* <Link to={`/Rider`} className='btn btn-outline mx-3 hover:bg-green-500'>Be a Rider</Link> */}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;