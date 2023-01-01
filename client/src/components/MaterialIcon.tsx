import type { MaterialIconType } from '@/types/misc';
import React, { FC } from 'react';

type Props = {
    /**
     * @default 'filled'
     */
    type?: MaterialIconType;
    icon: string;
    /**
     * @default 24
     */
    size?: number;
};

const MaterialIcon: FC<Props> = ({ type, icon, size }) => {
    return (
        <span
            className={`material-icons${
                type && type !== 'filled' ? `-${type}` : ''
            }`}
            style={{
                fontSize: `${size ?? 24}px`,
            }}
        >
            {icon}
        </span>
    );
};

export default MaterialIcon;
