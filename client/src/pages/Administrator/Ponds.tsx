import Pond from '@/components/Pond';
import { Modes, PondStatus } from '@/constants';
import { usePondList } from '@/hooks/api/administrator/pond';
import { Nullable, PondStatus as PondStatusType, Valid } from '@/types/misc';
import { Input, Option, Select } from '@material-tailwind/react';
import { debounce } from 'lodash-es';
import React, { FC, useState } from 'react';

const Ponds: FC = () => {
    const [keyword, setKeyword] = useState<Nullable<string>>();
    const [status, setStatus] = useState<PondStatusType>(PondStatus.AVAILABLE);
    const ponds = usePondList(keyword, status);

    const search = debounce((keyword: string) => {
        if (keyword.length >= 2) {
            setKeyword(keyword);
        } else {
            setKeyword(null);
        }
    }, 750);

    return (
        <div className='flex flex-wrap'>
            <div className='w-full flex flex-wrap'>
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
                <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 pl-2'>
                    <Select
                        label='Status'
                        onChange={(node) => {
                            const value = node?.toString();

                            if (value) {
                                setStatus(value as Valid);
                            }
                        }}
                        value={status}
                    >
                        {Object.values(PondStatus).map((status, index) => (
                            <Option key={index} value={status}>
                                {status}
                            </Option>
                        ))}
                    </Select>
                </div>
            </div>
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
