import React, { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => {
    return <div className='px-6 lg:px-40 py-10 lg:py-20'>{children}</div>;
};

export default Container;
