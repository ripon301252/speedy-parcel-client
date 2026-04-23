import React, { useState } from 'react';
import { Power } from 'lucide-react';

const VideoGuide = ({ toggle }) => {
    const [activeTab, setActiveTab] = useState('user');

    return (
        <section className="my-12 md:my-20 px-4">
            {/* Title */}
            <div className="text-center mb-8 md:mb-10">
                <h2 className="text-2xl md:text-4xl font-extrabold">
                    How to Use Speedy Parcel
                </h2>
                <p className="mt-2 md:mt-3 text-sm md:text-base text-gray-500">
                    সহজভাবে শিখুন কিভাবে আমাদের service ব্যবহার করবেন
                </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-3 mb-6 md:mb-8">
                <button
                    onClick={() => setActiveTab('user')}
                    className={`px-4 md:px-6 py-2 rounded-lg text-sm md:text-base font-semibold transition 
                    ${activeTab === 'user'
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    👤 User Guide
                </button>

                <button
                    onClick={() => setActiveTab('rider')}
                    className={`px-4 md:px-6 py-2 rounded-lg text-sm md:text-base font-semibold transition 
                    ${activeTab === 'rider'
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    🚴 Rider Guide
                </button>

                <button
                    onClick={toggle}
                    className="bg-green-500 text-white p-2 md:p-3 rounded-lg hover:scale-105 transition"
                >
                    <Power size={18} />
                </button>
            </div>

            {/* Video Card */}
            <div className="max-w-5xl mx-auto">
                <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl hover:scale-[1.01] transition">

                    <div className="w-full aspect-video">
                        <iframe
                            className="w-full h-full"
                            src={
                                activeTab === 'user'
                                    ? "https://www.youtube.com/embed/cH-hKNyBbQw"
                                    : "https://www.youtube.com/embed/hvjCGZbBuR8" 
                            }
                            title="Guide Video"
                            allowFullScreen
                        ></iframe>
                    </div>

                </div>
            </div>

            {/* Steps */}
            <div className="mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 text-center max-w-5xl mx-auto">
                {activeTab === 'user' ? (
                    <>
                        <div className="p-3 md:p-4 bg-white text-gray-800 rounded-xl shadow text-sm md:text-base">Create Account</div>
                        <div className="p-3 md:p-4 bg-white text-gray-800 rounded-xl shadow text-sm md:text-base">Send Parcel</div>
                        <div className="p-3 md:p-4 bg-white text-gray-800 rounded-xl shadow text-sm md:text-base">Make Payment</div>
                        <div className="p-3 md:p-4 bg-white text-gray-800 rounded-xl shadow text-sm md:text-base">Track Parcel</div>
                        <div className="p-3 md:p-4 bg-white text-gray-800 rounded-xl shadow text-sm md:text-base">Give Review</div>
                    </>
                ) : (
                    <>
                        <div className="p-3 md:p-4 bg-white text-gray-800 rounded-xl shadow text-sm md:text-base">Login</div>
                        <div className="p-3 md:p-4 bg-white text-gray-800 rounded-xl shadow text-sm md:text-base">View Parcels</div>
                        <div className="p-3 md:p-4 bg-white text-gray-800 rounded-xl shadow text-sm md:text-base">Accept Delivery</div>
                        <div className="p-3 md:p-4 bg-white text-gray-800 rounded-xl shadow text-sm md:text-base">Pickup Parcel</div>
                        <div className="p-3 md:p-4 bg-white text-gray-800 rounded-xl shadow text-sm md:text-base">Deliver</div>
                    </>
                )}
            </div>
        </section>
    );
};

export default VideoGuide;