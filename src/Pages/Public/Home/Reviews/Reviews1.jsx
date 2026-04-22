import React, { useEffect, useState } from 'react';
import reviewImg from '../../../../assets/reviewQuote.png';
import review from '../../../../assets/customer-top.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { FaStar } from "react-icons/fa";
import ReviewModal from './ReviewModal';
import { UserStar, Power } from 'lucide-react';



const Reviews1 = ({ toggle }) => {
    const [reviews, setReviews] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const res = await fetch('https://speedy-parcel-server-1.onrender.com/reviews');
                const data = await res.json();
                setReviews(data);
                // console.log(data)
            } catch (err) {
                console.log(err.massage)
            }
        }

        loadReviews()

    }, [])

    return (
        <div className='w-full max-w-[960px] mx-auto px-4 md:px-0 py-10'>
            <div className="flex flex-col justify-center items-center">
                {/* Image */}
                <div className="">
                    <img
                        src={review}
                        alt=""
                        className="w-40 sm:w-56 md:w-full max-w-md object-contain"
                    />
                </div>

                <h1 className="text-xl sm:text-2xl md:text-4xl font-bold leading-snug mt-5">
                    What our customers are saying
                </h1>

                <p className="mt-3 text-sm sm:text-base text-center mb-6">
                    Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                    Achieve proper alignment, reduce pain, and strengthen your body with ease!
                </p>
            </div>

            <div className='flex justify-center gap-3 mb-6'>
                <button onClick={toggle} className='cursor-pointer bg-green-500 text-gray-800 hover:scale-102 transition-transform p-2 rounded-lg'>
                    <Power />
                </button>
                <button
                    onClick={() => setIsOpen(true)}
                    className='btn text-gray-800 bg-gradient-to-r border-green-500 from-green-500 to-green-300 
                    cursor-pointer hover:scale-102 transition-transform shadow-none rounded-lg'
                >
                    <span><UserStar /></span>
                    Write a Review
                </button>
                {isOpen && <ReviewModal closeModal={() => setIsOpen(false)} />}
            </div>


            <hr className=' mb-8 mx-12' />

            <Swiper
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                // slidesPerView={3}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    480: { slidesPerView: 1.2 },
                    640: { slidesPerView: 1.5 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }, // desktop same
                }}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    // reverseDirection: true
                }}
            >

                {
                    reviews.map((review, index) => (
                        <SwiperSlide key={index} className='bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-md border border-gray-200'>
                            <div>
                                <img src={reviewImg} alt="" />
                            </div>
                            {/* <p className='text-gray-800 text-sm leading-relaxed mt-2'></p> */}
                            <p className='text-sm md:text-base text-gray-800 leading-relaxed mt-2'>{review.review}</p>
                            <div className='flex items-center gap-1 text-yellow-500 my-2'>
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className={i < review.ratings ? "text-yellow-500" : "text-gray-300"} />
                                ))}
                            </div>
                            <div className="border-t border-dashed border-green-600 my-5"></div>
                            <div className='flex items-center gap-5'>
                                <div>
                                    <img className='w-10 md:w-14 rounded-full' src={review.user_photoURL} alt="" />
                                </div>
                                <div className='text-gray-800'>
                                    <p className='font-bold text-base'>{review.userName}</p>
                                    <p>{review.designation}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
};

export default Reviews1;