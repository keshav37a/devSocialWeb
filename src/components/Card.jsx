import React from 'react';

const Card = ({ className = '', isCenter, children }) => {
    return (
        <div className={`${className} ${isCenter ? 'flex justify-center' : ''}`}>
            <div className='card bg-base-300 text-primary-content w-96'>
                <div className='card-body'>{children}</div>
            </div>
        </div>
    );
};

export default Card;
