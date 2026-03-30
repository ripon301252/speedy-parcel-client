import React from 'react';
import Banner from './Banner';
import Brand from './Brand';
import Reviews1 from './Reviews/Reviews1';
import Reviews2 from './Reviews/Reviews2';
import VideoGuide from './Video/VideoGuide';
import VideoGuides from './Video/VideoGuides';


const reviewPromise = fetch('http://localhost:3000/reviews')
    .then(res => res.json())
    .catch(err => console.log(err.massage))

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <Brand></Brand>
            {/* <VideoGuide></VideoGuide> */}
            <VideoGuides></VideoGuides>
            {/* <Reviews1></Reviews1> */}
            <Reviews2 reviewPromise={reviewPromise}></Reviews2>
        </div>
    );
};

export default Home;