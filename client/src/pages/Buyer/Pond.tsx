import { usePond } from '@/hooks/api/buyer/pond';
import { useMatch, useNavigate } from '@tanstack/react-location';
import React, { FC } from 'react';
import BasePond from '@/components/Pond';
import { Modes } from '@/constants';
import Comments from '@/components/Comments';
import { Button } from '@material-tailwind/react';

const Pond: FC = () => {
    const match = useMatch();
    const pond = usePond(match.params.id);
    const navigate = useNavigate();

    if (!pond) {
        return null;
    }

    return (
        <>
            <div className='flex mb-12'>
                <Button
                    type='button'
                    color='red'
                    onClick={(e) => {
                        e.preventDefault();
                        navigate({ to: `/buyer/dashboard/${pond.id}/report` });
                    }}
                    className='ml-auto'
                >
                    Report
                </Button>
            </div>
            <BasePond
                data={pond}
                mode={Modes.BUYER}
                headerClassName='relative h-40 md:h-96'
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
