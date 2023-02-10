import React, { FC, PropsWithChildren } from 'react';

const BulletText: FC<PropsWithChildren> = ({ children }) => {
    return (
        <ul className='list-disc px-8'>
            <li>
                <p className='my-5'>{children}</p>
            </li>
        </ul>
    );
};

export default BulletText;
