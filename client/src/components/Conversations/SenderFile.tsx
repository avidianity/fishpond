import dayjs from 'dayjs';
import React, { FC } from 'react';

type Props = {
    url: string;
    timestamp: string;
    mimeType: string;
    fileName: string;
};

const SenderFile: FC<Props> = ({ timestamp, url, mimeType, fileName }) => {
    return (
        <div className='flex justify-end mb-2'>
            <div className='rounded py-2 px-3 bg-teal-500 text-white'>
                <p className='text-sm mt-1'>
                    {mimeType.match(/image\/(.{0,})/g) ? (
                        <img src={url} className='w-40' />
                    ) : (
                        <a
                            href={url}
                            target='_blank'
                            rel='noreferrer'
                            className='text-white hover:underline hover:cursor-pointer'
                        >
                            {fileName}
                        </a>
                    )}
                </p>
                <p className='text-right text-xs text-grey-dark mt-1'>
                    {dayjs(timestamp).format('hh:mm A')}
                </p>
            </div>
        </div>
    );
};

export default SenderFile;
