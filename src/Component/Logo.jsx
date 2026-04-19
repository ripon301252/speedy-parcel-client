import React from 'react';
import logoImg from '../assets/delivery4.png';
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
            <Link to={`/`} className='flex items-center gap-1'>
                <div><img src={logoImg} className='w-9' alt="" /></div>
                <div>
                    <span className='text-xl font-bold dark:text-white '>Speedy</span>
                    <span className='text-xl font-bold text-green-600'>Parcel</span>
                </div>
            </Link>
        </div>
    );
};

export default Logo;