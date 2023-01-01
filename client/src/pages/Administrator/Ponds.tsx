import Pond from '@/components/Pond';
import { Modes } from '@/constants';
import { usePondList } from '@/hooks/api/administrator/pond';
import React, { FC } from 'react';

const Ponds: FC = () => {
    const ponds = usePondList();

    return (
        <div className='flex flex-wrap'>
            {ponds.map((pond, index) => (
                <div
                    className='w-full lg:w-1/2 xl:w-1/3 py-8 px-4 flex items-center justify-center'
                    key={index}
                >
                    <Pond
                        mode={Modes.ADMINISTRATOR}
                        data={pond}
                        cardClassName='w-80 border border-gray-100 shadow-lg'
                        headerClassName='relative h-56'
                        bodyClassName='text-center'
                    />
                </div>
            ))}
        </div>
    );
};

export default Ponds;
