import React, { useState } from 'react';
import { Power } from 'lucide-react';

const VideoGuide = ({ toggle }) => {
    const [activeTab, setActiveTab] = useState('user');

    return (
        <section className="my-20 px-4">
            {/* Title */}
            <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold ">
                    How to Use Speedy Parcel
                </h2>
                <p className="mt-3">
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
                <button onClick={toggle} className='cursor-pointer bg-green-500 text-gray-800 p-2 rounded-lg'>
                    <Power />
                </button>
            </div>

            {/* Video Card */}
            <div className="max-w-5xl mx-auto transition-all duration-500">
                <div className="rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform">

                    {activeTab === 'user' ? (
                        <iframe
                            className="w-full h-[400px]"
                            src="https://www.youtube.com/embed/h9GaDIXCt3s?si=zt1crzqGimEdeBNN"
                            title="User Guide"
                            allowFullScreen
                        ></iframe>

                    ) : (
                        <iframe
                            className="w-full h-[400px]"
                            src="https://www.youtube.com/embed/GmrIjuEeoz4?si=DvehSxnhdAZ5ibgM"
                            title="Rider Guide"
                            allowFullScreen
                        ></iframe>
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