import React, { useState } from 'react';
import { Power } from 'lucide-react';

const VideoGuide = ({ toggle }) => {
    const [activeTab, setActiveTab] = useState('user');

    return (
        <section className="my-12 md:my-20 px-4">
            {/* Title */}
            <div className="text-center mb-8 md:mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
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
                    className={`px-4 sm:px-5 md:px-6 py-2 rounded-lg text-sm md:text-base font-semibold transition 
                    ${activeTab === 'user'
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                >
                    👤 User Guide
                </button>

                <button
                    onClick={() => setActiveTab('rider')}
                    className={`px-4 sm:px-5 md:px-6 py-2 rounded-lg text-sm md:text-base font-semibold transition 
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

            {/* Video */}
            <div className="max-w-5xl mx-auto">
                <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">

                    {/* Responsive video container */}
                    <div className="w-full aspect-video bg-black">
                        <video
                            className="w-full h-full object-cover"
                            controls
                            key={activeTab}
                        >
                            {activeTab === 'user' ? (
                                <source
                                    src="https://cdn.dribbble.com/userupload/16569515/file/original-d99071d642c8efd87400222a0c344e1a.mp4"
                                    type="video/mp4"
                                />
                            ) : (
                                <source
                                    src="https://cdn.dribbble.com/userupload/44953456/file/76723a83e127562547a28df5001d257b.webm"
                                    type="video/webm"
                                />
                            )}
                        </video>
                    </div>

                </div>
            </div>

            {/* Steps */}
            <div className="mt-8 md:mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 text-center max-w-5xl mx-auto">
                {(activeTab === 'user'
                    ? ['Create Account', 'Send Parcel', 'Make Payment', 'Track Parcel', 'Give Review']
                    : ['Login', 'View Parcels', 'Accept Delivery', 'Pickup Parcel', 'Deliver']
                ).map((step, index) => (
                    <div
                        key={index}
                        className="p-3 md:p-4 bg-white text-gray-800 rounded-xl shadow text-xs sm:text-sm md:text-base hover:shadow-lg transition"
                    >
                        {step}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default VideoGuide;