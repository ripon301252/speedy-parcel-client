import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import brand1 from '../../../assets/brands/amazon_vector.png';
import brand2 from '../../../assets/brands/amazon.png';
import brand3 from '../../../assets/brands/casio.png';
import brand4 from '../../../assets/brands/moonstar.png';
import brand5 from '../../../assets/brands/randstad.png';
import brand6 from '../../../assets/brands/star.png';
import brand7 from '../../../assets/brands/start_people.png';
import { Autoplay } from 'swiper/modules';

const brandLogos = [brand1, brand2, brand3, brand4, brand5, brand6, brand7];

const Brand = () => {
    return (
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

            {/* <SwiperSlide><img src={brand1} alt="" /> </SwiperSlide>
            <SwiperSlide><img src={brand2} alt="" /> </SwiperSlide>
            <SwiperSlide><img src={brand3} alt="" /> </SwiperSlide>
            <SwiperSlide><img src={brand4} alt="" /> </SwiperSlide>
            <SwiperSlide><img src={brand5} alt="" /> </SwiperSlide>
            <SwiperSlide><img src={brand6} alt="" /> </SwiperSlide>
            <SwiperSlide><img src={brand7} alt="" /> </SwiperSlide> */}
        </Swiper>
    );
};

export default Brand;