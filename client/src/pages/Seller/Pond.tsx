import { usePond, usePondDelete } from '@/hooks/api/seller/pond';
import { useMatch, useNavigate } from '@tanstack/react-location';
import React, { FC } from 'react';
import BasePond from '@/components/Pond';
import { Modes } from '@/constants';
import Comments from '@/components/Comments';
import { Button } from '@material-tailwind/react';
import { Asker } from '@/helpers';

const Pond: FC = () => {
    const match = useMatch();
    const pond = usePond(match.params.id);
    const navigate = useNavigate();
    const mutation = usePondDelete();

    const deletePond = async () => {
        const proceed = await Asker.danger(
            'Are you sure you want to delete this pond?'
        );

        if (!proceed || !pond) {
            return;
        }

        mutation.mutate(pond.id);
        navigate({ to: '/seller/dashboard' });
    };

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
                <Button
                    type='button'
                    color='red'
                    onClick={(e) => {
                        e.preventDefault();
                        deletePond();
                    }}
                    className='ml-2'
                >
                    Delete Pond
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
