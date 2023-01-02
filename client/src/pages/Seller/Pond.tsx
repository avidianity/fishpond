import { usePond } from '@/hooks/api/seller/pond';
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
                    color='yellow'
                    onClick={(e) => {
                        e.preventDefault();
                        navigate({ to: `/seller/dashboard/${pond.id}/edit` });
                    }}
                    className='ml-auto'
                >
                    Edit Pond
                </Button>
            </div>
            <BasePond
                data={pond}
                mode={Modes.SELLER}
                headerClassName='relative h-40'
            />
            <Comments
                comments={pond.comments ?? []}
                id={match.params.id}
                mode={Modes.SELLER}
            />
        </>
    );
};

export default Pond;
