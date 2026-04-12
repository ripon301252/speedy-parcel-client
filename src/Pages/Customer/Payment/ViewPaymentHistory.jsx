import React from 'react';

const ViewPaymentHistory = ({ paymentHistory, onClose }) => {
    if (!paymentHistory) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 text-gray-800">
            <div className="bg-white w-full max-w-md md:max-w-lg rounded-xl shadow-lg p-5 overflow-y-auto max-h-[90vh]">

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                    Payment Details
                </h2>

                {/* Profile */}
                <div className="flex items-center gap-4 mb-4">
                    <img
                        src={paymentHistory.senderPhoto}
                        alt="sender"
                        className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div>
                        <p className="font-semibold text-lg">
                            {paymentHistory.senderName}
                        </p>
                        <p className="text-sm text-gray-500">
                            {paymentHistory.senderAddress}
                        </p>
                    </div>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm md:text-base">

                    <p><b>Email:</b> {paymentHistory.customerEmail}</p>

                    <p><b>Parcel:</b> {paymentHistory.parcelName}</p>

                    <p><b>Amount:</b> {paymentHistory.amount} {paymentHistory.currency?.toUpperCase()}</p>

                    <p className="break-all">
                        <b>Transaction ID:</b> {paymentHistory.transactionId}
                    </p>

                    <p>
                        <b>Tracking ID:</b>{" "}
                        <span className="text-blue-600 font-semibold">
                            {paymentHistory.trackingId || "Not Assigned"}
                        </span>
                    </p>

                    <p>
                        <b>Status:</b>{" "}
                        <span className={`font-semibold ${
                            paymentHistory.paymentStatus === "paid"
                                ? "text-green-600"
                                : "text-yellow-500"
                        }`}>
                            {paymentHistory.paymentStatus}
                        </span>
                    </p>

                    <p>
                        <b>Paid Date:</b>{" "}
                        {new Date(paymentHistory.paidDate).toLocaleString("en-BD", {
                            dateStyle: "medium",
                            timeStyle: "short",
                        })}
                    </p>

                </div>

                {/* Close Button */}
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

export default ViewPaymentHistory;