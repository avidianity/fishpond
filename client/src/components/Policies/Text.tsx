import React, { FC, PropsWithChildren } from 'react';

const Text: FC<PropsWithChildren> = ({ children }) => {
    return <p className='my-10'>{children}</p>;
};

export default Text;
