import { useState } from "react";

const ModalOTP = ({ onClose, onVerify }) => {
    const [inputOtp, setInputOtp] = useState('');

    const handleVerifyClick = () => {
        if (!inputOtp) return;
        onVerify(inputOtp);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 animate-fadeIn">
                
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        🔐 OTP Verification
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Enter the 6-digit code sent to your email
                    </p>
                </div>

                {/* Input */}
                <div className="mb-6">
                    <input
                        type="text"
                        value={inputOtp}
                        onChange={(e) => setInputOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="w-full text-gray-800 text-center tracking-[0.5em] text-xl font-semibold px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="w-1/2 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleVerifyClick}
                        disabled={!inputOtp}
                        className="w-1/2 py-2 rounded-xl bg-green-500 hover:bg-green-500/90 text-white font-semibold transition disabled:opacity-50"
                    >
                        Verify
                    </button>
                </div>

                {/* Extra */}
                <div className="text-center mt-4">
                    <p className="text-xs text-gray-400">
                        Didn’t receive code?{" "}
                        <span className="text-green-500 cursor-pointer hover:underline">
                            Resend
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ModalOTP;