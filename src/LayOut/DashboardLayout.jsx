import React from "react";
import { Link, Outlet, useLocation } from "react-router";
import { BadgeDollarSign, Cuboid, HandHelping, Motorbike, User, Users } from "lucide-react";
import useRole from "../Hooks/useRole";
import { useAuth } from "../Hooks/useAuth";
import Logo from "../Component/Logo";
import { MdOutlineHome } from "react-icons/md";
import { HiOutlineCash } from "react-icons/hi";
import ThemeToggle from "../Theme/ThemeToggle";

const DashboardLayout = () => {
  const activeClass = (path) =>
  isActive(path)
    ? "bg-green-100 text-green-600 font-semibold"
    : "hover:bg-base-300";

  const { role } = useRole();
  const { user } = useAuth();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("approve-rider")) return "Approve Riders";
    if (location.pathname.includes("assign-rider")) return "Assign Parcels & Riders";
    if (location.pathname.includes("user-management")) return "User Management";
    if (location.pathname.includes("riders-cash-out")) return "Riders Cash Out";
    if (location.pathname.includes("all-payment-history")) return "All Payment History";
    if (location.pathname.includes("user-profile")) return "User Profile";
    if (location.pathname.includes("all-parcels")) return "All Parcels";
    return "Dashboard";
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

              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                    />
                  </div>
                </div>

                <span className="text-sm font-medium hidden md:block">
                  {user?.displayName}
                </span>
              </div>
            </div>
          </nav>

          {/* HEADER CARD */}
          <div className="p-4">
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
          <div className="p-4">
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


                </>
              )}

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

// ==============================================================================

// import React from "react";
// import { Link, Outlet, useLocation } from "react-router";
// import logoImg from "../assets/delivery4.png";
// import { HandHelping, Motorbike, Users } from 'lucide-react';
// import useRole from "../Hooks/useRole";


// const DashboardLayout = () => {

//   const { role } = useRole();
//   const location = useLocation();

//   const getTitle = () => {
//     if (location.pathname.includes("approve-rider")) {
//       return "Approve Riders";
//     }
//     if (location.pathname.includes("assign-rider")) {
//       return "Assign Parcels & Riders";
//     }
//     if (location.pathname.includes("user-management")) {
//       return "User Management";
//     }
//     if (location.pathname.includes("dashboard")) {
//       return "Dashboard";
//     }
//     return "Dashboard";
//   };

//   return (
//     <div>
//       <div className="drawer lg:drawer-open">
//         <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
//         <div className="drawer-content">
//           {/* Navbar */}
//           <nav className="navbar w-full bg-base-300 sticky top-0 z-10">
//             <label
//               htmlFor="my-drawer-4"
//               aria-label="open sidebar"
//               className="btn btn-square btn-ghost"
//             >
//               {/* Sidebar toggle icon */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="0 0 24 24"
//                 strokeLinejoin="round"
//                 strokeLinecap="round"
//                 strokeWidth="2"
//                 fill="none"
//                 stroke="currentColor"
//                 className="my-1.5 inline-block size-4"
//               >
//                 <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
//                 <path d="M9 4v16"></path>
//                 <path d="M14 10l2 2l-2 2"></path>
//               </svg>
//             </label>
//             <div className="px-4">{getTitle()}</div>
//           </nav>
//           {/* Page content here */}
//           <Outlet></Outlet>

//         </div>

//         <div className="drawer-side is-drawer-close:overflow-visible">
//           <label
//             htmlFor="my-drawer-4"
//             aria-label="close sidebar"
//             className="drawer-overlay"
//           ></label>
//           <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
//             {/* Sidebar content here */}
//             <ul className="menu w-full grow">
//               {/* List item */}

//               <li>
//                 <Link
//                   to={"/"}
//                   className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                   data-tip="Homepage"
//                 >
//                   <img className=" my-1.5 inline-block size-5" src={logoImg} alt="" />
//                   <span className="is-drawer-close:hidden">Homepage</span>
//                 </Link>
//               </li>

//               {
//                 role === 'admin' && <>
//                   <li>
//                     <Link to={"/dashboard/approve-rider"}
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                       data-tip="Approve-Riders"
//                     >
//                       {/* Admin Dashboard icon */}
//                       <Motorbike className="text-green-300 my-1.5 inline-block size-5" />

//                       <span className="is-drawer-close:hidden">Approve Riders</span>
//                     </Link>
//                   </li>

//                   <li>
//                     <Link to={"/dashboard/assign-rider"}
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                       data-tip="Assign-Parcels & Riders"
//                     >
//                       {/* Admin Dashboard icon */}
//                       <HandHelping  className="text-green-300 my-1.5 inline-block size-5" />

//                       <span className="is-drawer-close:hidden">Assign Parcels & Riders</span>
//                     </Link>
//                   </li>

//                   <li>
//                     <Link
//                       to={"/dashboard/user-management"}
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                       data-tip="User Management"
//                     >
//                       <Users className="text-green-300 my-1.5 inline-block size-5" />

//                       <span className="is-drawer-close:hidden">User Management</span>
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={"/dashboard/riders-cash-out"}
//                       className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                       data-tip="Riders Cash Out"
//                     >
//                       <Users className="text-green-300 my-1.5 inline-block size-5" />

//                       <span className="is-drawer-close:hidden">Riders Cash Out</span>
//                     </Link>
//                   </li>
//                 </>
//               }

//               {/* List item */}
//               <li>
//                 <button
//                   className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
//                   data-tip="Settings"
//                 >
//                   {/* Settings icon */}
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 24 24"
//                     strokeLinejoin="round"
//                     strokeLinecap="round"
//                     strokeWidth="2"
//                     fill="none"
//                     stroke="currentColor"
//                     className="my-1.5 inline-block size-4"
//                   >
//                     <path d="M20 7h-9"></path>
//                     <path d="M14 17H5"></path>
//                     <circle cx="17" cy="17" r="3"></circle>
//                     <circle cx="7" cy="7" r="3"></circle>
//                   </svg>
//                   <span className="is-drawer-close:hidden">Settings</span>
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;