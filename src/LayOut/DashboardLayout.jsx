import React, { useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { BadgeDollarSign, ChartArea, Cuboid, HandHelping, LogOut, Motorbike, User, Users } from "lucide-react";
import useRole from "../Hooks/useRole";
import { useAuth } from "../Hooks/useAuth";
import Logo from "../Component/Logo";
import { MdOutlineHome } from "react-icons/md";
import { HiOutlineCash } from "react-icons/hi";
import ThemeToggle from "../Theme/ThemeToggle";
import { toast } from "react-toastify";

const DashboardLayout = () => {
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef();

  const { role } = useRole();
  const { user, logOut } = useAuth();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("approve-rider")) return "Approve Riders";
    if (location.pathname.includes("assign-rider")) return "Assign Parcels & Riders";
    if (location.pathname.includes("user-management")) return "User Management";
    if (location.pathname.includes("riders-cash-out")) return "Riders Cash Out";
    if (location.pathname.includes("all-payment-history")) return "All Payment History";
    if (location.pathname.includes("user-profile")) return "User Profile";
    if (location.pathname.includes("all-parcels")) return "All Parcels";
    if (location.pathname.includes("charts")) return "Charts";
    return "Dashboard";
  };

  

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logout successful"))
      .catch((err) => toast.error(err.message));
  };

  // 👉 sidebar auto close (mobile UX)
  const closeDrawer = () => {
    const drawer = document.getElementById("my-drawer-4");
    if (drawer) drawer.checked = false;
  };

  return (
    <div className="min-h-screen bg-base-100">

      <div className="drawer lg:drawer-open">

        {/* TOGGLE CONTROL */}
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

        {/* MAIN CONTENT */}
        <div className="drawer-content">

          {/* TOP NAVBAR */}
          <nav className="navbar bg-base-200 shadow-md sticky top-0 z-10 px-4">

            {/* MOBILE MENU BUTTON */}
            <label
              htmlFor="my-drawer-4"
              className="btn btn-square btn-ghost lg:hidden"
            >
              ☰
            </label>

            <h1 className="text-sm font-bold ml-2">{getTitle()}</h1>

            <div className="ml-auto flex items-center gap-3">

              <ThemeToggle />

              <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
                {role}
              </span>

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
                        className="absolute right-0 mt-13 w-52 bg-white dark:bg-gray-800 shadow-xl rounded-xl p-3 z-50"
                      >
                        <p className="font-semibold text-gray-800 dark:text-white">
                          {user?.displayName || "User"}
                        </p>
                        <p className="text-xs text-gray-500 break-all">
                          {user?.email}
                        </p>

                        <span className="mt-2 text-xs bg-amber-100 text-amber-600 px-2 py-1 rounded">
                          {role}
                        </span>

                        <hr className="my-2" />

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


            </div>
          </nav>

          {/* HEADER CARD */}
          <div className="lg:p-4 p-1">
            <div className="bg-base-200 rounded-xl p-4 shadow flex justify-between items-center">

              <div>
                <h2 className="text-xl font-bold">{getTitle()}</h2>
                <p className="text-sm text-gray-500">
                  Welcome back 👋 Manage everything from here
                </p>
              </div>

              <div className="hidden md:block stats shadow">
                <div className="stat">
                  <div className="stat-title">Status</div>
                  <div className="stat-value text-green-500 text-lg">
                    Active
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* PAGE CONTENT */}
          <div className="lg:p-4 p-1">
            <Outlet />
          </div>

        </div>

        {/* SIDEBAR */}
        <div className="drawer-side">

          {/* OVERLAY (click to close) */}
          <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

          <div className="min-h-full w-64 bg-base-200 p-3">

            {/* LOGO */}
            <div className=" mb-4 px-1">
              {/* <img src={logoImg} className="w-8" />
              <h2 className="font-bold text-lg">ParcelX</h2> */}
              <Logo></Logo>
            </div>

            <ul className="menu gap-1">

              {/* HOME */}
              <li>
                <Link
                  to="/"
                  onClick={closeDrawer}
                  className="flex gap-2 items-center hover:text-green-300"
                >
                  <MdOutlineHome size={18} />
                  Home
                </Link>
              </li>

              {/* ADMIN MENU */}
              {role === "admin" && (
                <>
                  <li className="menu-title">Admin Panel</li>

                  <li>
                    <Link
                      to="/dashboard/user-profile"
                      onClick={closeDrawer}
                      className="flex gap-2 items-center hover:text-green-300"
                    >
                      <User size={18} />
                      User Profile
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/user-management"
                      onClick={closeDrawer}
                      className="flex gap-2 items-center hover:text-green-300"
                    >
                      <Users size={18} />
                      User Management
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/all-parcels"
                      onClick={closeDrawer}
                      className="flex gap-2 items-center hover:text-green-300"
                    >
                      <Cuboid size={18} />
                      All parcels
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/approve-rider"
                      onClick={closeDrawer}
                      className="flex gap-2 items-center hover:text-green-300"
                    >
                      <Motorbike size={18} />
                      Approve Riders
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/dashboard/assign-rider"
                      onClick={closeDrawer}
                      className="flex gap-2 items-center hover:text-green-300"
                    >
                      <HandHelping size={18} />
                      Assign Parcels
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/riders-cash-out"
                      onClick={closeDrawer}
                      className="flex gap-2 items-center hover:text-green-300"
                    >
                      <HiOutlineCash size={18} />
                      Riders Cash Out
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/all-payment-history"
                      onClick={closeDrawer}
                      className="flex gap-2 items-center hover:text-green-300"
                    >
                      <BadgeDollarSign size={18} />
                      All Payment History
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/charts"
                      onClick={closeDrawer}
                      className="flex gap-2 items-center hover:text-green-300"
                    >
                      <ChartArea size={18} />
                      Chart
                    </Link>
                  </li>
                </>
              )}

              <button
                onClick={handleLogout}
                className="flex gap-2 items-center text-left px-3 py-2 rounded hover:bg-red-100 text-red-500 text-sm cursor-pointer"
              >
                <LogOut size={18} />
                Logout
              </button>

              {/* SETTINGS */}
              <li className="mt-6">
                <button className="flex gap-2 items-center hover:text-green-300">
                  ⚙️ Settings
                </button>
              </li>

            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;


