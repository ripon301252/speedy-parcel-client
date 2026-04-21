import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { HiMenu, HiOutlineCash, HiX } from "react-icons/hi";
import { useAuth } from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import ThemeToggle from "../Theme/ThemeToggle";
import Logo from "./Logo";
import { toast } from "react-toastify";
import { FaBox } from "react-icons/fa";
import { MdOutlineHome } from "react-icons/md";
import { BadgeDollarSign, ChartArea, Cuboid, HandHelping, Handshake, Info, LayoutDashboard, LogIn, LogOut, MapPin, Motorbike, PackageCheck, Phone, Send, UserPen } from "lucide-react";

const Navbar = () => {
    const { user, logOut } = useAuth();
    const { role, isLoading } = useRole();

    const [menuOpen, setMenuOpen] = useState(false);
    const [avatarOpen, setAvatarOpen] = useState(false);
    const avatarRef = useRef();

    const handleLogout = () => {
        logOut()
            .then(() => toast.success("Logout successful"))
            .catch((err) => toast.error(err.message));
    };

    const activeLinks = (isActive) =>
        `px-3 py-2 text-sm font-medium flex items-center gap-1 transition-all duration-300 ${isActive
            ? "text-gray-800 text-xs bg-green-300 rounded-lg"
            : "text-xs dark:text-gray-200 hover:bg-green-300 hover:text-gray-800 rounded-lg"
        }`;

    // 🔗 Links
    const publicLinks = (
        <>
            <NavLink
                to="/" className={({ isActive }) => activeLinks(isActive)}
            >
                <MdOutlineHome size={18} />
                Home
            </NavLink>
            <NavLink
                to="/about"
                className={({ isActive }) => activeLinks(isActive)}
            >
                <Info size={18} />
                About Us
            </NavLink>
            <NavLink
                to="/contact"
                className={({ isActive }) => activeLinks(isActive)}
            >
                <Phone size={18} />
                Contact
            </NavLink>
            <NavLink
                to="/coverage"
                className={({ isActive }) => activeLinks(isActive)}
            >
                <MapPin size={18} />
                Coverage
            </NavLink>
            <NavLink
                to="/send-parcel"
                className={({ isActive }) => activeLinks(isActive)}
            >
                <Send size={18} />
                Send Parcel
            </NavLink>
        </>
    );

    const userLinks = (
        <>
            <NavLink
                to="/send-parcel"
                className={({ isActive }) => activeLinks(isActive)}
            >
                <Send size={18}/>
                Send Parcel
            </NavLink>

            <NavLink
                to="/my-parcels"
                className={({ isActive }) => activeLinks(isActive)}
            >
                <Cuboid size={18} />
                My Parcels
            </NavLink>
            <NavLink
                to="/payment-history"
                className={({ isActive }) => activeLinks(isActive)}
            >
                <BadgeDollarSign size={18} />
                Payments
            </NavLink>
        </>
    );

    const riderLinks = (
        <>
            <NavLink
                to="/assigned-deliveries"
                className={({ isActive }) => activeLinks(isActive)}
            >
                <HandHelping size={18} />
                Assigned
            </NavLink>
            <NavLink
                to="/completed-deliveries"
                className={({ isActive }) => activeLinks(isActive)}
            >
                <PackageCheck size={18} />
                Completed
            </NavLink>
            <NavLink
                to="/cash-out-history"
                className={({ isActive }) => activeLinks(isActive)}
            >
                <HiOutlineCash size={18} />
                Cash Out
            </NavLink>
        </>
    );

    const adminLinks = (
        <>
            <NavLink
                to="/dashboard" className={({ isActive }) => activeLinks(isActive)}
            >
                <LayoutDashboard size={18} />
                Dashboard
            </NavLink>
            <NavLink
                to="/dashboard/charts"
                className={({ isActive }) => activeLinks(isActive)}
            >
                <ChartArea size={18} />
                Chart
            </NavLink>
            <NavLink 
            to="/dashboard/user-profile" 
            className={({ isActive }) => activeLinks(isActive)}
            >
                <UserPen size={18} />
                Profile
            </NavLink>
        </>
    );

    if (isLoading) {
        return (
            <div className="text-center py-5">
                <span className="loading loading-ring loading-lg"></span>
            </div>
        );
    }

    return (
        <nav className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/70  border-b border-gray-800 shadow-sm z-[999]">
            <div className="max-w-7xl lg:mx-auto py-4 flex justify-between items-center  mx-3">

                {/* Logo */}
                <Logo />

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-3 items-center">
                    {!user && publicLinks}
                    {user && role === "user" && userLinks}
                    {user && role === "rider" && riderLinks}
                    {user && role === "admin" && adminLinks}
                </div>



                {/* Right Side */}
                <div className="flex items-center gap-3">
                    {/* <NavLink to="/all-users" className="btn btn-xs btn-warning">Dashboard</NavLink> */}
                    <ThemeToggle />

                    <NavLink to="/rider"
                        className="btn btn-sm btn-outline text-amber-500 rounded-lg hover:bg-amber-500 shadow-none hover:border-amber-500 hover:text-gray-800 hidden lg:inline-flex"
                    >
                        <Motorbike size={18} />
                        Be a Rider
                    </NavLink>

                    

                    {/* Avatar */}
                    <div className="relative hidden lg:inline-flex" ref={avatarRef}

                        onClick={() => setAvatarOpen(false)} // outside click = close
                    >
                        {user ? (
                            <>
                                <img
                                    onClick={(e) => {
                                        e.stopPropagation(); // prevent parent click
                                        setAvatarOpen(!avatarOpen);
                                    }}
                                    src={
                                        user?.photoURL ||
                                        "https://i.ibb.co/4pDNDk1/avatar.png"
                                    }
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full border-2 border-amber-400 cursor-pointer object-cover"
                                />

                                {avatarOpen && (
                                    <div
                                        onClick={(e) => e.stopPropagation()} // inside click safe
                                        className="absolute right-0 mt-14 w-52 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-3 z-50"
                                    >
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
                                            className="flex gap-1 items-center px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                                        >
                                            <UserPen size={18} />
                                            Profile
                                        </Link>

                                        <Link
                                            to="/dashboard"
                                            className=" flex gap-1 items-center px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                                        >
                                            <LayoutDashboard size={18} />
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex gap-1 items-center text-left px-3 py-2 rounded hover:bg-red-100 text-red-500 text-sm cursor-pointer"
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to="/login" className="btn btn-sm btn-outline text-green-500 hover:bg-green-500 shadow-none hover:border-green-500 hover:text-gray-800 rounded-lg">
                                <LogIn size={16} />
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
                            <NavLink to="/rider" className="btn btn-sm w-full bg-green-500 ">Be a Rider</NavLink>
                            {/* <NavLink to="/dashboard/charts" className="btn btn-sm w-full bg-green-500">Chart</NavLink> */}
                            <Link
                                to="/dashboard"
                                onClick={() => setMenuOpen(false)}
                                className="btn btn-sm btn-warning w-full rounded-lg"
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
                                    <LogOut size={18} />
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