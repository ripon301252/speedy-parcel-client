import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
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
import { Autoplay } from 'swiper/modules';
import { Power } from 'lucide-react';

const brandLogos = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];

const Brand = ({ toggle }) => {
    return (
        <div className='max-w-7xl mx-auto px-5 py-7'>
            <div className="flex justify-center items-center gap-2 mb-7">
                <h3 className="text-center text-4xl font-bold my-5">
                    We've helped thousands of sales teams
                </h3>
                <button onClick={toggle} className='cursor-pointer bg-green-500 text-gray-800 hover:scale-102 transition-transform p-2 rounded-lg'>
                    <Power size={16} />
                </button>
            </div>
            <Swiper
                slidesPerView={4}
                centeredSlides={true}
                spaceBetween={30}
                grabCursor={true}
                loop={true}
                autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                    reverseDirection: true
                }}
                modules={[Autoplay]}

            >
                {
                    brandLogos.map((logo, index) => {
                        return <SwiperSlide key={index}><img src={logo} alt="" /> </SwiperSlide>
                    })
                }

            </Swiper>

            <div className="border-1 border-dashed border-gray-300 w-full my-20"></div>

            <div className="bg-white border-1 border-gray-300 rounded-2xl md:p-8 p-5 mt-7">
                <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-16">
                    <div>
                        <img src={brand8} alt="" />
                    </div>

                    <div className="border-l border-dashed border-gray-800 h-32 hidden md:block"></div>

                    <div className="flex flex-col items-center md:items-start text-center md:text-left text-gray-800">
                        <h1 className="font-bold text-2xl">Live Parcel Tracking</h1>
                        <p>
                            Stay updated in real-time with our live parcel tracking feature.
                            From pick-up to delivery, monitor your shipment's journey and get
                            instant status updates for complete peace of mind.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white border-1 border-gray-300 rounded-2xl md:p-8 p-5 mt-7">
                <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-16">
                    <div>
                        <img src={brand9} alt="" />
                    </div>

                    <div className="border-l border-dashed border-gray-800 h-32 hidden md:block"></div>

                    <div className="flex flex-col items-center md:items-start text-center md:text-left text-gray-800">
                        <h1 className="font-bold text-2xl">100% Safe Delivery</h1>
                        <p>
                            We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white border-1 border-gray-300 rounded-2xl md:p-8 p-5 mt-7">
                <div className="flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-16">
                    <div>
                        <img className="md:w-[158px] md:h-24" src={brand10} alt="" />
                    </div>

                    <div className="border-l border-dashed border-gray-800 h-32 hidden md:block"></div>

                    <div className="flex flex-col items-center md:items-start text-center md:text-left text-gray-800">
                        <h1 className="font-bold text-2xl">24/7 Call Center Support</h1>
                        <p>
                            Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Brand;