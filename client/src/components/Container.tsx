import React, { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className='container pt-10 mx-auto max-w-screen-xl'>
            {children}
        </div>
    );
};

export default Container;
