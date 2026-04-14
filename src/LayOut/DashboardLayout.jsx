import React from "react";
import { Link, Outlet, useLocation } from "react-router";
import logoImg from "../assets/delivery4.png";
import { HandHelping, Motorbike, Users } from 'lucide-react';
import useRole from "../Hooks/useRole";


const DashboardLayout = () => {

  const { role } = useRole();
  const location = useLocation();

  const getTitle = () => {
    if (location.pathname.includes("approve-rider")) {
      return "Approve Riders";
    }
    if (location.pathname.includes("assign-rider")) {
      return "Assign Parcels & Riders";
    }
    if (location.pathname.includes("user-management")) {
      return "User Management";
    }
    if (location.pathname.includes("dashboard")) {
      return "Dashboard";
    }
    return "Dashboard";
  };

  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300 sticky top-0 z-10">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <div className="px-4">{getTitle()}</div>
          </nav>
          {/* Page content here */}
          <Outlet></Outlet>

        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}

              <li>
                <Link
                  to={"/"}
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  <img className=" my-1.5 inline-block size-5" src={logoImg} alt="" />
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>

              {
                role === 'admin' && <>
                  <li>
                    <Link to={"/dashboard/approve-rider"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Approve-Riders"
                    >
                      {/* Admin Dashboard icon */}
                      <Motorbike className="text-green-300 my-1.5 inline-block size-5" />

                      <span className="is-drawer-close:hidden">Approve Riders</span>
                    </Link>
                  </li>

                  <li>
                    <Link to={"/dashboard/assign-rider"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="Assign-Parcels & Riders"
                    >
                      {/* Admin Dashboard icon */}
                      <HandHelping  className="text-green-300 my-1.5 inline-block size-5" />

                      <span className="is-drawer-close:hidden">Assign Parcels & Riders</span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={"/dashboard/user-management"}
                      className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                      data-tip="User Management"
                    >
                      <Users className="text-green-300 my-1.5 inline-block size-5" />

                      <span className="is-drawer-close:hidden">User Management</span>
                    </Link>
                  </li>
                </>
              }

              {/* List item */}
              <li>
                <button
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Settings"
                >
                  {/* Settings icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                    className="my-1.5 inline-block size-4"
                  >
                    <path d="M20 7h-9"></path>
                    <path d="M14 17H5"></path>
                    <circle cx="17" cy="17" r="3"></circle>
                    <circle cx="7" cy="7" r="3"></circle>
                  </svg>
                  <span className="is-drawer-close:hidden">Settings</span>
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
