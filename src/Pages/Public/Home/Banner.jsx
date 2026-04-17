import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  const slides = [
    {
      video:
        "https://cdn.dribbble.com/userupload/3592456/file/original-600055e7d75ac5c434520de2146147b0.mp4",
      title: "Fast & Reliable Delivery",
      desc: "We deliver your parcels quickly and safely across the country.",
    },
    {
      video:
        "https://cdn.dribbble.com/userupload/3717874/file/original-14925efac7bf8695238b8154bf457763.mp4",
      title: "Track Your Parcel Live",
      desc: "Real-time tracking system to monitor your deliveries.",
    },
    {
      video:
        "https://cdn.dribbble.com/userupload/18331836/file/original-597c38b76bf2b846ed390bee5c9cfed9.mov",
      title: "Cash on Delivery Available",
      desc: "Flexible payment options for your convenience.",
    },
  ];

  return (
    <div className="mb-8 md:mb-12">
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        showThumbs={false}
        showStatus={false}
        swipeable
        showIndicators={true}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative">

            {/* Video */}
            <video
              className="w-full h-[220px] sm:h-[320px] md:h-[450px] lg:h-[600px] object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={slide.video} type="video/mp4" />
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end sm:justify-center items-center text-center px-4 pb-8 sm:pb-0">

              <div className="max-w-xl">

                <h1 className="text-lg sm:text-3xl md:text-5xl font-extrabold text-white mb-2 sm:mb-4 leading-tight">
                  {slide.title}
                </h1>

                <p className="text-xs sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-6">
                  {slide.desc}
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                  <button className="px-5 py-2 sm:px-8 sm:py-3 bg-green-500 hover:bg-green-600 transition rounded-full font-semibold text-sm sm:text-base">
                    Get Started
                  </button>

                  <button className="px-5 py-2 sm:px-8 sm:py-3 border border-white text-white hover:bg-white hover:text-black transition rounded-full font-semibold text-sm sm:text-base">
                    Learn More
                  </button>
                </div>

              </div>
            </div>

          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;