import React, { useState } from 'react';
import Banner from './Banner';
import Brand from './Brand';
import Reviews1 from './Reviews/Reviews1';
import Reviews2 from './Reviews/Reviews2';
import VideoGuide from './Video/VideoGuide';
import VideoGuides from './Video/VideoGuides';

const reviewPromise = fetch('http://localhost:3000/reviews')
    .then(res => res.json())
    .catch(err => console.log(err.message))

const Home = () => {

    const [showVideo, setShowVideo] = useState(true);
    const [showReview, setShowReview] = useState(true);

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
                    : <Reviews2 reviewPromise={reviewPromise} toggle={() => setShowReview(true)}
                    />
                }
            </div>

            {/* {showVideo ? <VideoGuide /> : <VideoGuides />}

            {showReview
                ? <Reviews1 />
                : <Reviews2 reviewPromise={reviewPromise} />
            } */}
        </div>
    );
};

export default Home;