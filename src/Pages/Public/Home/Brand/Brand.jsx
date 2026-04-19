import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Power } from 'lucide-react';

import brand1 from '../../../../assets/brands/amazon_vector.png';
import brand2 from '../../../../assets/brands/amazon.png';
import brand3 from '../../../../assets/brands/casio.png';
import brand4 from '../../../../assets/brands/moonstar.png';
import brand5 from '../../../../assets/brands/randstad.png';
import brand6 from '../../../../assets/brands/star.png';
import brand7 from '../../../../assets/brands/start_people.png';

import brand8 from "../../../../assets/live-tracking.png";
import brand9 from "../../../../assets/safe-delivery.png";
import brand10 from "../../../../assets/tiny-deliveryman.png";

const brandLogos = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];

const Brand = ({ toggle }) => {
    return (
        <div className='max-w-7xl mx-auto  md:px-6 py-6 md:py-10'>

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-3 mb-6">
                <h3 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold">
                    We've helped thousands of sales teams
                </h3>

                <button
                    onClick={toggle}
                    className='bg-green-500 text-gray-800 hover:scale-105 transition-transform p-2 rounded-lg'
                >
                    <Power size={16} />
                </button>
            </div>

            {/* Swiper */}
            <Swiper
                spaceBetween={20}
                loop={true}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {
                    brandLogos.map((logo, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex items-center justify-center h-16 md:h-20">
                                <img
                                    src={logo}
                                    alt=""
                                    className="max-h-full max-w-[120px] object-contain opacity-80 hover:opacity-100 transition"
                                />
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {/* Divider */}
            <div className="border border-dashed border-gray-300 w-full my-12 md:my-16"></div>

            {/* Card 1 */}
            <div className="bg-white border border-gray-300 rounded-2xl p-5 md:p-8 mt-5">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">

                    <img src={brand8} alt="" className="w-24 md:w-32" />

                    <div className="hidden md:block border-l border-dashed border-gray-400 h-24"></div>

                    <div className="text-center md:text-left">
                        <h1 className="font-bold text-xl md:text-2xl mb-2">
                            Live Parcel Tracking
                        </h1>
                        <p className="text-sm md:text-base text-gray-600">
                            Stay updated in real-time with our live parcel tracking feature.
                            Monitor your shipment from pick-up to delivery.
                        </p>
                    </div>
                </div>
            </div>



            {/* Card 2 */}
            <div className="bg-white border border-gray-300 rounded-2xl p-5 md:p-8 mt-5">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">

                    <img src={brand9} alt="" className="w-24 md:w-32" />

                    <div className="hidden md:block border-l border-dashed border-gray-400 h-24"></div>

                    <div className="text-center md:text-left">
                        <h1 className="font-bold text-xl md:text-2xl mb-2">
                            100% Safe Delivery
                        </h1>
                        <p className="text-sm md:text-base text-gray-600">
                            We ensure secure and damage-free delivery with utmost care.
                        </p>
                    </div>
                </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-300 rounded-2xl p-5 md:p-8 mt-5">
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">

                    <img src={brand10} alt="" className="w-24 md:w-28" />

                    <div className="hidden md:block border-l border-dashed border-gray-400 h-24"></div>

                    <div className="text-center md:text-left">
                        <h1 className="font-bold text-xl md:text-2xl mb-2">
                            24/7 Call Center Support
                        </h1>
                        <p className="text-sm md:text-base text-gray-600">
                            Our support team is always ready to help you anytime.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Brand;