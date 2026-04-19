import React from 'react';

const ViewUser = ({ userView, onClose }) => {
    if (!userView) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-2 text-gray-800">
            <div className="bg-white w-full max-w-md md:max-w-lg rounded-xl shadow-lg p-5">

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                    User Details
                </h2>

                {/* Profile */}
                <div className="flex items-center gap-4 mb-4">
                    <img
                        src={userView.photoURL}
                        alt="user"
                        className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div>
                        <p className="text-lg font-semibold">
                            {userView.name}
                        </p>
                        <p className="text-sm text-gray-500">
                            {userView.email}
                        </p>
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm md:text-base">

                    <p>
                        <b>User ID:</b>{" "}
                        <span className="break-all">{userView._id}</span>
                    </p>

                    <p>
                        <b>Role:</b>{" "}
                        <span className={`font-semibold ${
                            userView.role === "rider"
                                ? "text-blue-600"
                                : userView.role === "admin"
                                ? "text-red-500"
                                : "text-green-600"
                        }`}>
                            {userView.role}
                        </span>
                    </p>

                    <p>
                        <b>Created At:</b>{" "}
                        {new Date(userView.createdAt).toLocaleString("en-BD", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    </p>

                </div>

                {/* Button */}
                <div className="flex justify-end mt-5">
                    <button
                        onClick={onClose}
                        className="btn btn-sm btn-error"
                    >
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ViewUser;