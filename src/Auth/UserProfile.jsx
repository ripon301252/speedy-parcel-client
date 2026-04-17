import React from "react";
import { useAuth } from "../Hooks/useAuth";
import { FaEnvelope, FaUser, FaCalendarAlt } from "react-icons/fa";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 relative">
          
          <div className="absolute -bottom-12 left-6">
            <img
              src={user?.photoURL}
              alt="profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 px-6 pb-6">
          
          {/* Name */}
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaUser className="text-blue-500" />
            {user?.displayName || "No Name"}
          </h1>

          {/* Email */}
          <p className="text-gray-600 mt-2 flex items-center gap-2">
            <FaEnvelope className="text-indigo-500" />
            {user?.email}
          </p>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            
            <div className="p-4 rounded-xl bg-gray-50 border">
              <p className="text-sm text-gray-500">User ID</p>
              <p className="font-medium break-all">{user?.uid}</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border">
              <p className="text-sm text-gray-500">Account Type</p>
              <p className="font-medium text-green-600">Active User</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border">
              <p className="text-sm text-gray-500">Verified</p>
              <p className="font-medium">
                {user?.emailVerified ? "Yes ✅" : "No ❌"}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border">
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <FaCalendarAlt /> Last Login
              </p>
              <p className="font-medium text-sm">
                {user?.metadata?.lastSignInTime
                  ? new Date(user.metadata.lastSignInTime).toLocaleString()
                  : "N/A"}
              </p>
            </div>

          </div>

          {/* Button */}
          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              Edit Profile
            </button>

            <button className="px-4 py-2 rounded-lg border hover:bg-gray-100 transition">
              Settings
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;