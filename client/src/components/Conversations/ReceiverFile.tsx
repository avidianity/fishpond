import dayjs from 'dayjs';
import React, { FC } from 'react';

type Props = {
    name: string;
    url: string;
    timestamp: string;
    mimeType: string;
    fileName: string;
};

const ReceiverFile: FC<Props> = ({
    name,
    url,
    timestamp,
    mimeType,
    fileName,
}) => {
    return (
        <div className='flex mb-2'>
            <div className='rounded py-2 px-3 bg-[#F2F2F2]'>
                <p className='text-sm text-teal'>{name}</p>
                <p className='text-sm mt-1'>
                    {mimeType.match(/image\/(.{0,})/g) ? (
                        <img src={url} className='w-40' />
                    ) : (
                        <a
                            href={url}
                            target='_blank'
                            rel='noreferrer'
                            className='text-blue-400 hover:text-blue-600 hover:cursor-pointer'
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

export default ReceiverFile;
