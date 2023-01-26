import React, { FC, MouseEventHandler, PropsWithChildren } from 'react';

type Props = {
    className?: string;
    onClick?: MouseEventHandler;
    disabled?: boolean;
};

const Button: FC<PropsWithChildren<Props>> = ({
    children,
    className,
    onClick,
    disabled,
}) => {
    if (disabled) {
        return null;
    }

    return (
        <span
            className={`absolute top-1/2 h-6 w-6 bg-white hover:cursor-pointer flex items-center justify-center rounded-full ${
                className ?? ''
            }`}
            onClick={onClick}
        >
            {children}
        </span>
    );
};

export default Button;
