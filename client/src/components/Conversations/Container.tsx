import React, { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className='pt-20'>
            <div className='container mx-auto mt-[-128px]'>
                <div className='py-6 h-[calc(100vh_-_100px)]'>
                    <div className='flex border border-grey rounded shadow-lg h-full'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Container;
