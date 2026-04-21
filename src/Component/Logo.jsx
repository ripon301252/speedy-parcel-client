import React from 'react';
import logoImg from '../assets/delivery5.png';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
            <Link to={`/`} className='flex items-center gap-1'>
                <div><img src={logoImg} className='w-10' alt="" /></div>
                <div>
                    <span className='text-xl font-bold dark:text-white '>Speedy</span>
                    <span className='text-xl font-bold text-[#449107]'>Parcel</span>
                </div>
            </Link>
        </div>
    );
};

export default Logo;