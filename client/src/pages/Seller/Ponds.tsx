import Pond from '@/components/Pond';
import { Modes } from '@/constants';
import { usePondList } from '@/hooks/api/seller/pond';
import { Button } from '@material-tailwind/react';
import { useNavigate } from '@tanstack/react-location';
import React, { FC } from 'react';

const Ponds: FC = () => {
    const ponds = usePondList();
    const navigate = useNavigate();

    return (
        <>
            <div className='flex mb-4'>
                <Button
                    type='button'
                    color='blue-gray'
                    onClick={(e) => {
                        e.preventDefault();
                        navigate({ to: '/seller/dashboard/add' });
                    }}
                    className='ml-auto'
                >
                    Add Pond
                </Button>
            </div>
            <div className='flex flex-wrap'>
                {ponds.map((pond, index) => (
                    <div
                        className='w-full lg:w-1/2 xl:w-1/3 py-8 px-4 flex items-center justify-center'
                        key={index}
                    >
                        <Pond
                            mode={Modes.SELLER}
                            data={pond}
                            cardClassName='w-80 border border-gray-100 shadow-lg'
                            headerClassName='relative h-56'
                            bodyClassName='text-center'
                        />
                    </div>
                ))}
            </div>
        </>
    );
};

export default Ponds;
