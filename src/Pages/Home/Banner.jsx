import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from '../../assets/delivery1.png';
import bannerImg2 from '../../assets/delivery2.webp';
import bannerImg3 from '../../assets/delivery3.png';

const Banner = () => {
    return (
        <Carousel autoPlay={true} infiniteLoop={true} interval={"1500"} showThumbs={false} showStatus={false}>
            <div>
                <img className='h-[500px]' src={bannerImg1} />

            </div>
            <div>
                <img className='h-[500px]' src={bannerImg2} />

            </div>
            <div>
                <img className='h-[500px]' src={bannerImg3} />

            </div>
        </Carousel>
    );
};

export default Banner;