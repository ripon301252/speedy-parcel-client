import React from "react";
import { NavLink, Outlet } from "react-router";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto bg-white border border-gray-300 rounded-2xl my-6 md:my-12 p-6 md:p-16">

      {/* Heading */}
      <h1 className="text-3xl md:text-5xl text-gray-800 font-bold">
        About Us
      </h1>

      {/* Description */}
      <p className="text-gray-500 text-sm md:text-base mt-4 leading-relaxed">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages <br className="hidden md:block" />
        to business shipments — we deliver on time, every time.
      </p>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-3 md:gap-4 mt-6 md:mt-10 mb-5 text-sm md:text-base">

        {[
          { to: "story", label: "Story" },
          { to: "mission", label: "Mission" },
          { to: "success", label: "Success" },
          { to: "team", label: "Team & Others" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg border transition-all duration-200 text-xs
        ${isActive
                ? "bg-[#6c5f29] text-white shadow-md "
                : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}

      </div>

      {/* Nested Routes Render */}
      <Outlet />
    </div>
  );
};

export default AboutUs;
