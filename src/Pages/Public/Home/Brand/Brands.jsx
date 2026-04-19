import React from "react";
import Marquee from "react-fast-marquee";
import { Power } from "lucide-react";

import brand1 from "../../../../assets/brands/amazon.png";
import brand2 from "../../../../assets/brands/amazon_vector.png";
import brand3 from "../../../../assets/brands/casio.png";
import brand4 from "../../../../assets/brands/moonstar.png";
import brand5 from "../../../../assets/brands/randstad.png";
import brand6 from "../../../../assets/brands/star.png";
import brand7 from "../../../../assets/brands/start_people.png";

import brand8 from "../../../../assets/live-tracking.png";
import brand9 from "../../../../assets/safe-delivery.png";
import brand10 from "../../../../assets/tiny-deliveryman.png";

const logos = [brand2, brand3, brand1, brand4, brand5, brand6, brand7];

const Brands = ({ toggle }) => {
  return (
    <div className="max-w-7xl mx-auto md:px-6 py-6 md:py-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-6">
        <h3 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
          We've helped thousands of sales teams
        </h3>

        <button
          onClick={toggle}
          className="bg-green-500 text-gray-800 hover:scale-105 transition-transform p-2 rounded-lg"
        >
          <Power size={16} />
        </button>
      </div>

      {/* Marquee */}
      <Marquee
        direction="right"
        speed={25}
        pauseOnHover={true}
        gradient={false}
      >
        <div className="flex items-center gap-10 md:gap-16 ">
          {logos.map((logo, i) => (
            <img 
            src={logo} 
            alt="" 
            className="max-h-full max-w-[120px] object-contain opacity-80 hover:opacity-100 transition"
        />
          ))}
        </div>
      </Marquee>

      {/* Divider */}
      <div className="border border-dashed border-gray-300 w-full my-12 md:my-16"></div>

      {/* Card Component */}
      {[
        {
          img: brand8,
          title: "Live Parcel Tracking",
          desc: "Stay updated in real-time with our live parcel tracking feature. Monitor your shipment from pick-up to delivery.",
        },
        {
          img: brand9,
          title: "100% Safe Delivery",
          desc: "We ensure your parcels are handled carefully and delivered securely without damage.",
        },
        {
          img: brand10,
          title: "24/7 Call Center Support",
          desc: "Our support team is available anytime to assist you with any delivery concerns.",
        },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white border border-gray-300 rounded-2xl p-5 md:p-8 mt-5"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">

            {/* Image */}
            <img
              src={item.img}
              alt=""
              className="w-24 md:w-32 object-contain"
            />

            {/* Divider */}
            <div className="hidden md:block border-l border-dashed border-gray-400 h-24"></div>

            {/* Text */}
            <div className="text-center md:text-left">
              <h1 className="font-bold text-xl md:text-2xl mb-2">
                {item.title}
              </h1>
              <p className="text-sm md:text-base text-gray-600">
                {item.desc}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Brands;