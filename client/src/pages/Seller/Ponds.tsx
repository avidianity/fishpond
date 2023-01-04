import Pond from '@/components/Pond';
import { Modes } from '@/constants';
import { usePondList } from '@/hooks/api/seller/pond';
import { Nullable } from '@/types/misc';
import { Button, Input } from '@material-tailwind/react';
import { useNavigate } from '@tanstack/react-location';
import { debounce } from 'lodash-es';
import React, { FC, useState } from 'react';

const Ponds: FC = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState<Nullable<string>>();
    const ponds = usePondList(keyword);

    const search = debounce((keyword: string) => {
        if (keyword.length >= 2) {
            setKeyword(keyword);
        } else {
            setKeyword(null);
        }
    }, 750);

    return (
        <>
            <div className='flex mb-4'>
                <div className='flex flex-wrap'>
                    <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
                        <Input
                            type='search'
                            label='Search'
                            onChange={(e) => {
                                e.preventDefault();
                                search(e.target.value);
                            }}
                        />
                    </div>
                </div>
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
