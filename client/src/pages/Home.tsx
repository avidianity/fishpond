import { Button } from '@material-tailwind/react';
import { useNavigate } from '@tanstack/react-location';
import React, { FC, MouseEventHandler } from 'react';

const Home: FC = () => {
    const navigate = useNavigate();

    const createHandler = (
        target: string
    ): MouseEventHandler<HTMLButtonElement> => {
        return (e) => {
            e.preventDefault();
            navigate({
                to: target,
            });
        };
    };

    return (
        <div className='flex items-center justify-center h-screen w-screen'>
            <div className='px-14 py-20 text-center shadow-lg border border-gray-100 rounded-xl relative'>
                <h4 className='text-4xl font-bold italic'>LookApond</h4>
                <h6 className='text-lg mt-1'>Buy and Rent</h6>
                <p className='mt-2 mb-6'>Choose a role before continuing</p>
                <Button
                    color='blue'
                    variant='text'
                    className='block my-4 underline absolute bottom-0 right-2'
                    onClick={createHandler('administrator/login')}
                >
                    Administrator
                </Button>
                <Button
                    color='red'
                    className='block my-4 w-full underline'
                    onClick={createHandler('seller/login')}
                >
                    Seller
                </Button>
                <Button
                    color='green'
                    className='block my-4 w-full underline'
                    onClick={createHandler('buyer/login')}
                >
                    Buyer
                </Button>
            </div>
        </div>
    );
};

export default Home;
