import React, { FC, PropsWithChildren } from 'react';

const Title: FC<PropsWithChildren> = ({ children }) => {
    return <h1 className='text-2xl font-bold mt-2'>{children}</h1>;
};

export default Title;
