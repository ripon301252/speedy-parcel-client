import React, { useState } from 'react';

const VideoGuide = () => {
    const [activeTab, setActiveTab] = useState('user');

    return (
        <section className="my-20 px-4">
            {/* Title */}
            <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold ">
                    How to Use Speedy Parcel
                </h2>
                <p className=" mt-3">
                    সহজভাবে শিখুন কিভাবে আমাদের service ব্যবহার করবেন
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-8 gap-4">
                <button
                    onClick={() => setActiveTab('user')}
                    className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === 'user'
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    👤 User Guide
                </button>

                <button
                    onClick={() => setActiveTab('rider')}
                    className={`px-6 py-2 rounded-full font-semibold transition ${activeTab === 'rider'
                            ? 'bg-green-500 text-white shadow-lg'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                >
                    🚴 Rider Guide
                </button>
            </div>

            {/* Video Card */}
            <div className="max-w-5xl mx-auto transition-all duration-500">
                <div className="rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform">

                    {activeTab === 'user' ? (
                        <video
                            className="w-full h-[400px] object-cover"
                            controls
                            key="user"
                        >
                            {/* <source src="https://cdn.dribbble.com/userupload/44360845/file/4988e26dadf995df34b5bfde3d04d45d.mp4" type="video/mp4" /> */}
                            <source src="https://cdn.dribbble.com/userupload/16569515/file/original-d99071d642c8efd87400222a0c344e1a.mp4" type="video/mp4" />
                        </video>
                    ) : (
                        <video
                            className="w-full h-[400px] object-cover"
                            controls
                            key="rider"
                        >
                            <source src="https://cdn.dribbble.com/userupload/44953456/file/76723a83e127562547a28df5001d257b.webm" type="video/mp4" />
                            {/* <source src="https://www.pexels.com/download/video/5104853/" type="video/mp4" /> */}
                        </video>
                    )}

                </div>
            </div>

            {/* Steps */}
            <div className="mt-12 grid md:grid-cols-5 gap-4 text-center max-w-5xl mx-auto">
                {activeTab === 'user' ? (
                    <>
                        <div className="p-4 bg-white text-gray-800 rounded-xl shadow">Create Account</div>
                        <div className="p-4 bg-white text-gray-800 rounded-xl shadow">Place Order</div>
                        <div className="p-4 bg-white text-gray-800 rounded-xl shadow">Make Payment</div>
                        <div className="p-4 bg-white text-gray-800 rounded-xl shadow">Track Parcel</div>
                        <div className="p-4 bg-white text-gray-800 rounded-xl shadow">Give Review</div>
                    </>
                ) : (
                    <>
                        <div className="p-4 bg-white text-gray-800 rounded-xl shadow">Login</div>
                        <div className="p-4 bg-white text-gray-800 rounded-xl shadow">View Parcels</div>
                        <div className="p-4 bg-white text-gray-800 rounded-xl shadow">Accept Delivery</div>
                        <div className="p-4 bg-white text-gray-800 rounded-xl shadow">Pickup Parcel</div>
                        <div className="p-4 bg-white text-gray-800 rounded-xl shadow">Deliver</div>
                    </>
                )}
            </div>
        </section>
    );
};

export default VideoGuide;