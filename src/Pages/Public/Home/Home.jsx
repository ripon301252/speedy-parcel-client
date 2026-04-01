import React, { useState, useEffect } from 'react';
import Banner from './Banner';
import Brand from './Brand';
import Reviews1 from './Reviews/Reviews1';
import Reviews2 from './Reviews/Reviews2';
import VideoGuide from './Video/VideoGuide';
import VideoGuides from './Video/VideoGuides';

const reviewPromise = fetch('http://localhost:3000/reviews')
    .then(res => res.json())
    .catch(err => console.log(err.message));

const Home = () => {
    // load state from localStorage or default true
    const [showVideo, setShowVideo] = useState(() => {
        const saved = localStorage.getItem('showVideo');
        return saved !== null ? JSON.parse(saved) : true;
    });

    const [showReview, setShowReview] = useState(() => {
        const saved = localStorage.getItem('showReview');
        return saved !== null ? JSON.parse(saved) : true;
    });

    // save showVideo to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('showVideo', JSON.stringify(showVideo));
    }, [showVideo]);

    // save showReview to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('showReview', JSON.stringify(showReview));
    }, [showReview]);

    return (
        <div>
            <Banner />
            <Brand />

            <div className="">
                {showVideo
                    ? <VideoGuide toggle={() => setShowVideo(false)} />
                    : <VideoGuides toggle={() => setShowVideo(true)} />
                }

                {showReview
                    ? <Reviews1 toggle={() => setShowReview(false)} />
                    : <Reviews2 reviewPromise={reviewPromise} toggle={() => setShowReview(true)} />
                }
            </div>
        </div>
    );
};

export default Home;