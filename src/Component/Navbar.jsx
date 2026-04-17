import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import ThemeToggle from "../Theme/ThemeToggle";
import Logo from "./Logo";
import { toast } from "react-toastify";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { role, isLoading } = useRole();

    const [menuOpen, setMenuOpen] = useState(false);
    const [avatarOpen, setAvatarOpen] = useState(false);
    const avatarRef = useRef();

    // 🔒 outside click close dropdown
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (avatarRef.current && !avatarRef.current.contains(e.target)) {
                setAvatarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logOut()
            .then(() => toast.success("Logout successful"))
            .catch((err) => toast.error(err.message));
    };

    const activeLinks = ({ isActive }) =>
        `px-3 py-2 text-sm font-medium transition-all duration-300 ${isActive
            ? "text-amber-500 border-b-2 border-amber-500"
            : "text-gray-700 dark:text-gray-200 hover:text-amber-500"
        }`;

    // 🔗 Links
    const publicLinks = (
        <>
            <NavLink to="/" className={activeLinks}>Home</NavLink>
            <NavLink to="/about" className={activeLinks}>About</NavLink>
            <NavLink to="/contact" className={activeLinks}>Contact</NavLink>
            <NavLink to="/coverage" className={activeLinks}>Coverage</NavLink>
            <NavLink to="/send-parcel" className={activeLinks}>Send Parcel</NavLink>
        </>
    );

    const userLinks = (
        <>
            <NavLink to="/send-parcel" className={activeLinks}>Send Parcel</NavLink>
            <NavLink to="/my-parcels" className={activeLinks}>My Parcels</NavLink>
            <NavLink to="/payment-history" className={activeLinks}>Payments</NavLink>
        </>
    );

    const riderLinks = (
        <>
            <NavLink to="/assigned-deliveries" className={activeLinks}>Assigned</NavLink>
            <NavLink to="/completed-deliveries" className={activeLinks}>Completed</NavLink>
            <NavLink to="/cash-out-history" className={activeLinks}>Cash Out</NavLink>
        </>
    );

    // const adminLinks = (
    //     <>
    //         <NavLink to="/all-users" className={activeLinks}>Admin Dashboard</NavLink>
    //         {/* <NavLink to="/all-parcels" className={activeLinks}>Parcels</NavLink>
    //         <NavLink to="/all-payment-history" className={activeLinks}>Payments</NavLink> */}
    //     </>
    // );

    if (isLoading) {
        return (
            <div className="text-center py-5">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    return (
        <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b shadow-sm z-[9999]">
            <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">

                {/* Logo */}
                <Logo />

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-5 items-center">
                    {!user && publicLinks}
                    {user && role === "user" && userLinks}
                    {user && role === "rider" && riderLinks}
                    {/* {user && role === "admin" && adminLinks} */}
                </div>



                {/* Right Side */}
                <div className="flex items-center gap-3">
                    {/* <NavLink to="/all-users" className="btn btn-xs btn-warning">Dashboard</NavLink> */}

                    <NavLink to="/rider" className="btn btn-xs btn-warning hidden lg:inline-flex">Be a Rider</NavLink>

                    <ThemeToggle />

                    {/* Avatar */}
                    <div className="relative hidden lg:inline-flex" ref={avatarRef}>
                        {user ? (
                            <>
                                <img
                                    onClick={() => setAvatarOpen(!avatarOpen)}
                                    src={
                                        user?.photoURL ||
                                        "https://i.ibb.co/4pDNDk1/avatar.png"
                                    }
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full border-2 border-amber-400 cursor-pointer object-cover"
                                />

                                {/* Dropdown */}
                                {avatarOpen && (
                                    <div className="absolute right-0 mt-13 w-52 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-3 z-50">

                                        <p className="font-semibold text-gray-800 dark:text-white">
                                            {user?.displayName || "User"}
                                        </p>
                                        <p className="text-xs text-gray-500 break-all">
                                            {user?.email}
                                        </p>

                                        <div className="mt-2 text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded">
                                            {role}
                                        </div>

                                        <hr className="my-2" />

                                        <Link
                                            to="/user-profile"
                                            className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                                        >
                                            Profile
                                        </Link>

                                        <Link
                                            to="/dashboard"
                                            className="block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                                        >
                                            Dashboard
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-3 py-2 rounded hover:bg-red-100 text-red-500 text-sm"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to="/login" className="btn btn-sm rounded-full">
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-2xl"
                    >
                        {menuOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>
            </div>

            
            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-xl border-t z-50 animate-fadeIn">

                    <div className="flex flex-col p-4 space-y-3">

                        {!user && publicLinks}
                        {user && role === "user" && userLinks}
                        {user && role === "rider" && riderLinks}


                        <div className="border-t pt-3 space-y-2">
                        <NavLink to="/rider" className="btn btn-sm w-full btn-warning ">Be a Rider</NavLink>
                            <Link
                                to="/dashboard"
                                onClick={() => setMenuOpen(false)}
                                className="btn btn-sm w-full rounded-lg"
                            >
                                Dashboard
                            </Link>

                            {user ? (
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMenuOpen(false);
                                    }}
                                    className="btn btn-sm bg-red-500 text-white w-full rounded-lg"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="btn btn-sm w-full rounded-lg"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;