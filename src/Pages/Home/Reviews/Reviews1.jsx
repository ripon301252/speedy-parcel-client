import React, { useEffect, useState } from 'react';
import reviewImg from '../../../assets/reviewQuote.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { FaStar } from "react-icons/fa";
import ReviewModal from './ReviewModal';

const Reviews1 = () => {
    const [reviews, setReviews] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const res = await fetch('../../reviews.json');
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
        <div className='w-[960px] mx-auto py-10'>
            
            <div className='flex justify-center gap-5 mb-5'>
                <h1 className='text-4xl'>Reviews </h1>
                <button onClick={() => setIsOpen(true)} className='btn text-gray-800 bg-gradient-to-r border-green-500 from-green-500 to-green-300 cursor-pointer hover:scale-102 transition-transform shadow-none rounded-lg'>Add Review</button>
                {isOpen && <ReviewModal closeModal={() => setIsOpen(false)} />}
            </div>

            <hr className=' mb-8 mx-12'/>
            
            <Swiper
                loop={true}
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
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
                        <SwiperSlide key={index} className='bg-white p-4 rounded-3xl'>
                            <div>
                                <img src={reviewImg} alt="" />
                            </div>
                            <p className='text-gray-800'>{review.review}</p>
                            <p className='text-gray-800 my-2 flex items-center gap-1 font-semibold'> Ratings : {review.ratings} <FaStar className='text-yellow-500' /></p>
                            <div className="border-t border-dashed border-green-600 my-5"></div>
                            <div className='flex items-center gap-5'>
                                <div>
                                    <img className='w-14 rounded-full' src={review.user_photoURL} alt="" />
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