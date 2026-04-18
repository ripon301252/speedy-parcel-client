import React from "react";

const ViewDetails = ({ parcel, onClose }) => {
    const status = parcel.paymentStatus || "Un-Paid";
    if (!parcel) return null;


    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-3 h-screen">

            <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-xl p-5 md:p-6 text-gray-800">

                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-lg md:text-xl font-bold text-gray-800">
                        Parcel Details
                    </h2>

                    <button
                        onClick={onClose}
                        className="btn btn-sm btn-error"
                    >
                        Close
                    </button>
                </div>

                {/* Tracking ID */}
                <div className="mb-4">
                    <p className="text-sm text-gray-500">Tracking ID</p>
                    <p className={`font-bold ${parcel.trackingId ? "text-blue-600" : "text-gray-400"}`}>
                        {parcel.trackingId || "Not Assigned Yet"}
                    </p>
                </div>

                {/* Sender Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                    <div className="border rounded-lg p-3">
                        <h3 className="font-semibold mb-2">Sender Info</h3>

                        <div className="flex items-center gap-3 mb-2">
                            <img
                                src={parcel.senderPhoto}
                                alt="sender"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold">{parcel.senderName}</p>
                                <p className="text-xs text-gray-500">{parcel.senderEmail}</p>
                            </div>
                        </div>

                        <p className="text-sm"><b>Phone:</b> {parcel.senderPhoneNumber}</p>
                        <p className="text-sm"><b>Region:</b> {parcel.senderRegion}</p>
                        <p className="text-sm"><b>District:</b> {parcel.senderDistrict}</p>
                        <p className="text-sm"><b>Area:</b> {parcel.senderArea}</p>
                        <p className="text-sm"><b>Address:</b> {parcel.senderAddress}</p>
                    </div>

                    {/* Receiver Info */}
                    <div className="border rounded-lg p-3">
                        <h3 className="font-semibold mb-2">Receiver Info</h3>

                        <p className="text-sm"><b>Name:</b> {parcel.receiverName}</p>
                        <p className="text-sm"><b>Email:</b> {parcel.receiverEmail}</p>
                        <p className="text-sm"><b>Phone:</b> {parcel.receiverPhoneNumber}</p>
                        <p className="text-sm"><b>Region:</b> {parcel.receiverRegion}</p>
                        <p className="text-sm"><b>District:</b> {parcel.receiverDistrict}</p>
                        <p className="text-sm"><b>Area:</b> {parcel.receiverArea}</p>
                        <p className="text-sm"><b>Address:</b> {parcel.receiverAddress}</p>
                    </div>

                </div>

                {/* Parcel Info */}
                <div className="border rounded-lg p-3 mb-4">
                    <h3 className="font-semibold mb-2">Parcel Info</h3>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <p><b>Name:</b> {parcel.parcelName}</p>
                        <p><b>Type:</b> {parcel.parcelType}</p>
                        <p><b>Weight:</b> {parcel.parcelWeight} Kg</p>
                        <p><b>Cost:</b> {parcel.cost} Tk</p>
                        <p>
                            <b>Status:</b>{" "}

                            <span
                                className={`font-semibold ${status === "paid"
                                    ? "text-green-600"
                                    : "text-yellow-500"
                                    }`}
                            >
                                {status}
                            </span>
                        </p>
                        <p><b>Created:</b> {new Date(parcel.createdAt).toLocaleString()}</p>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="text-xs text-gray-400 text-center animate-pulse">
                    Speedy Parcel System • Safe Delivery Tracking
                </p>

            </div>
        </div>
    );
};

export default ViewDetails;