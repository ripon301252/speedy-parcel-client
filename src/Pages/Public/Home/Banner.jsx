import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    const videos = [
        "https://cdn.dribbble.com/userupload/43815550/file/original-f356998b7c1370a514912f2f3f426e69.mp4",
        "https://cdn.dribbble.com/userupload/3592456/file/original-600055e7d75ac5c434520de2146147b0.mp4",
        "https://cdn.dribbble.com/userupload/3717874/file/original-14925efac7bf8695238b8154bf457763.mp4",
        "https://cdn.dribbble.com/userupload/18331836/file/original-597c38b76bf2b846ed390bee5c9cfed9.mov",
        "https://cdn.dribbble.com/userupload/43430747/file/original-740b1773eb207c5fd2f354206b0ff61a.mp4"
    ];

    return (
        <div className="mb-10">
            <Carousel
                autoPlay
                infiniteLoop
                interval={5000}
                showThumbs={false}
                showStatus={false}
                stopOnHover={false}
                swipeable
            >
                {
                    videos.map((video, index) => (
                        <div key={index} className="relative group">

                            {/* 🎥 Video */}
                            <video
                                className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-cover transition-transform duration-700 group-hover:scale-105"
                                autoPlay
                                muted
                                loop
                                playsInline
                            >
                                <source src={video} type="video/mp4" />
                            </video>

                            {/* 🌑 Overlay */}
                            <div className="absolute inset-0 bg-black/40"></div>

                            {/* 📝 Content */}
                            {/* <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                                <h1 className="text-xl sm:text-3xl md:text-5xl font-bold mb-3">
                                    Fast & Reliable Delivery
                                </h1>

                                <p className="text-sm sm:text-base md:text-lg mb-4 max-w-xl">
                                    We deliver your parcels quickly and safely across the country.
                                </p>

                                <button className="px-5 py-2 sm:px-6 sm:py-3 bg-green-500 hover:bg-green-600 transition rounded-full font-semibold shadow-lg">
                                    Get Started
                                </button>
                            </div> */}

                        </div>
                    ))
                }
            </Carousel>
        </div>
    );
};

export default Banner;