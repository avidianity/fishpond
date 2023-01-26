import React, { FC, useState } from 'react';
import Button from '@/components/Carousel/Button';

type Props = {
    urls: string[];
};

const Carousel: FC<Props> = ({ urls }) => {
    const [activeIndex, setIndex] = useState(0);

    return (
        <div className='w-full h-full relative'>
            {urls.map((url, index) => (
                <img
                    key={index}
                    src={url}
                    className={`h-full w-full object-cover ${
                        index === activeIndex ? '' : 'hidden'
                    }`}
                />
            ))}
            <Button
                className='left-2'
                onClick={(e) => {
                    e.preventDefault();
                    setIndex(activeIndex - 1);
                }}
                disabled={activeIndex === 0}
            >
                <i className='fas fa-angle-left'></i>
            </Button>
            <Button
                className='right-2'
                onClick={(e) => {
                    e.preventDefault();
                    setIndex(activeIndex + 1);
                }}
                disabled={activeIndex === urls.length - 1}
            >
                <i className='fas fa-angle-right'></i>
            </Button>
        </div>
    );
};

export default Carousel;
