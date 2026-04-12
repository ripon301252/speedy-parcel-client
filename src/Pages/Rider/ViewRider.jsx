import React from 'react';

const ViewRider = ({ riderView, onClose }) => {
    if (!riderView) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 text-gray-800">
            <div className="bg-white w-full max-w-md md:max-w-xl rounded-xl shadow-lg p-5 overflow-y-auto max-h-[90vh]">

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                    Rider Details
                </h2>

                {/* Profile */}
                <div className="flex items-center gap-4 mb-4">
                    <img
                        src={riderView.riderPhoto}
                        alt="rider"
                        className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div>
                        <p className="text-lg font-semibold">
                            {riderView.riderName}
                        </p>
                        <p className="text-sm text-gray-500">
                            {riderView.riderEmail}
                        </p>
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm md:text-base">

                    <p><b>Phone:</b> {riderView.riderPhoneNumber}</p>

                    <p>
                        <b>Address:</b> {riderView.riderAddress},{" "}
                        {riderView.riderArea}, {riderView.riderDistrict},{" "}
                        {riderView.riderRegion}
                    </p>

                    <p><b>NID:</b> {riderView.riderNID}</p>

                    <p><b>Driving License:</b> {riderView.riderDrivingLicense}</p>

                    <p><b>Bike Info:</b> {riderView.riderBikeINfo}</p>

                    <p>
                        <b>Status:</b>{" "}
                        <span className={`font-semibold ${
                            riderView.status === "approved"
                                ? "text-green-600"
                                : riderView.status === "pending"
                                ? "text-yellow-500"
                                : "text-red-500"
                        }`}>
                            {riderView.status}
                        </span>
                    </p>

                    <p>
                        <b>Created At:</b>{" "}
                        {new Date(riderView.createdAt).toLocaleString("en-BD", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    </p>

                    {riderView.riderText && (
                        <p>
                            <b>Note:</b> {riderView.riderText}
                        </p>
                    )}

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

export default ViewRider;