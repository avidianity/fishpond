import { usePond } from '@/hooks/api/buyer/pond';
import { useMatch } from '@tanstack/react-location';
import React, { FC } from 'react';
import BasePond from '@/components/Pond';
import { Modes } from '@/constants';
import Comments from '@/components/Comments';

const Pond: FC = () => {
    const match = useMatch();
    const pond = usePond(match.params.id);

    if (!pond) {
        return null;
    }

    return (
        <>
            <BasePond
                data={pond}
                mode={Modes.BUYER}
                headerClassName='relative h-40'
            />
            <Comments
                comments={pond.comments ?? []}
                id={match.params.id}
                mode={Modes.BUYER}
            />
        </>
    );
};

export default Pond;
