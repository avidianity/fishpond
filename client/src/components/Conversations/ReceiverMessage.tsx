import dayjs from 'dayjs';
import React, { FC } from 'react';

type Props = {
    name: string;
    message: string;
    timestamp: string;
};

const ReceiverMessage: FC<Props> = ({ name, message, timestamp }) => {
    return (
        <div className='flex mb-2'>
            <div className='rounded py-2 px-3 bg-[#F2F2F2]'>
                <p className='text-sm text-teal'>{name}</p>
                <p className='text-sm mt-1'>{message}</p>
                <p className='text-right text-xs text-grey-dark mt-1'>
                    {dayjs(timestamp).format('hh:mm A')}
                </p>
            </div>
        </div>
    );
};

export default ReceiverMessage;
