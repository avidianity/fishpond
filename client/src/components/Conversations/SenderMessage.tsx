import dayjs from 'dayjs';
import React, { FC } from 'react';

type Props = {
    message: string;
    timestamp: string;
};

const SenderMessage: FC<Props> = ({ message, timestamp }) => {
    return (
        <div className='flex justify-end mb-2'>
            <div className='rounded py-2 px-3 bg-teal-500 text-white'>
                <p className='text-sm mt-1'>{message}</p>
                <p className='text-right text-xs text-grey-dark mt-1'>
                    {dayjs(timestamp).format('hh:mm A')}
                </p>
            </div>
        </div>
    );
};

export default SenderMessage;
