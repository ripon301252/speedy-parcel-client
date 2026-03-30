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
        <Carousel
            autoPlay={true}
            infiniteLoop={true}
            interval={5000}
            showThumbs={false}
            showStatus={false}
            stopOnHover={false}
            className='mb-10'
        >
            {
                videos.map((video, index) => (
                    <div key={index}>
                        <video
                            className="w-full h-[480px] object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            <source src={video} type="video/mp4" />
                        </video>
                    </div>
                ))
            }
        </Carousel>
    );
};

export default Banner;