import MaterialIcon from '@/components/MaterialIcon';
import { usePond, usePondComment } from '@/hooks/api/administrator/pond';
import { Nullable, SenderType } from '@/types/misc';
import { Sender } from '@/types/models/administrator/sender';
import { Rating } from '@/types/models/rating';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    IconButton,
    Input,
    Typography,
} from '@material-tailwind/react';
import { Divider } from '@mui/material';
import { useMatch } from '@tanstack/react-location';
import dayjs from 'dayjs';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';

type Input = {
    message: string;
};

const Pond: FC = () => {
    const match = useMatch();
    const pond = usePond(match.params.id);
    const { register, handleSubmit, reset } = useForm<Input>();
    const mutation = usePondComment(match.params.id);

    const calculateRatings = (ratings: Rating[]) => {
        if (ratings.length === 0) {
            return 'No Ratings';
        }

        const fiveStars = ratings.filter((rating) => rating.value === 5).length;
        const fourStars = ratings.filter((rating) => rating.value === 4).length;
        const threeStars = ratings.filter(
            (rating) => rating.value === 3
        ).length;
        const twoStars = ratings.filter((rating) => rating.value === 2).length;
        const oneStars = ratings.filter((rating) => rating.value === 1).length;

        return (
            (5 * fiveStars +
                4 * fourStars +
                3 * threeStars +
                2 * twoStars +
                1 * oneStars) /
            (fiveStars + fourStars + threeStars + twoStars + oneStars)
        );
    };

    const submit = handleSubmit(async (payload) => {
        await mutation.mutateAsync(payload.message);
        reset();
    });

    const getName = (sender: Nullable<Sender>, type: SenderType) => {
        if (!sender) {
            return 'Unknown';
        }

        if (type === 'administrator') {
            return sender.email;
        }

        return `${sender.first_name} ${sender.last_name}`;
    };

    if (!pond) {
        return null;
    }

    const comments = pond.comments ?? [];

    return (
        <>
            <Card>
                <CardHeader className='relative h-40'>
                    <img
                        src={pond.image.url}
                        alt='img-blur-shadow'
                        className='h-full w-full object-cover'
                    />
                </CardHeader>
                <CardBody>
                    <Typography variant='h5' className='mb-2'>
                        {pond.name}
                    </Typography>
                    <Typography variant='small' className='font-bold'>
                        {pond.owner?.first_name} {pond.owner?.last_name}
                    </Typography>
                    <Typography>{pond.description}</Typography>
                </CardBody>
                <CardFooter
                    divider
                    className='flex items-center justify-between py-3'
                >
                    <Typography variant='small'>
                        {pond.ratings ? (
                            <span className='font-bold'>
                                {calculateRatings(pond.ratings)}
                            </span>
                        ) : (
                            <span className='font-bold'>No Ratings</span>
                        )}
                    </Typography>
                    <Typography
                        variant='small'
                        color='gray'
                        className='flex gap-1'
                    >
                        <i className='fas fa-map-marker-alt fa-sm mt-[3px]' />
                        {pond.status}
                    </Typography>
                </CardFooter>
            </Card>
            <Card className='mt-20'>
                <CardBody>
                    <div className='flex'>
                        <Typography variant='h5'>Comments</Typography>
                        <Typography variant='small' className='mt-1 ml-auto'>
                            {comments.length} Comments
                        </Typography>
                    </div>
                    <div className='py-4'>
                        <Divider />
                    </div>
                    {comments.map((comment, index) => (
                        <div
                            key={index}
                            className='py-3 px-6 my-2 border border-gray-200 rounded-lg'
                        >
                            <div className='flex mb-4'>
                                <span className='font-bold'>
                                    {getName(
                                        comment.sender,
                                        comment.sender_type
                                    )}
                                </span>
                                <span className='ml-14'>
                                    {dayjs(comment.updated_at).fromNow()}
                                </span>
                            </div>
                            <Typography>{comment.message}</Typography>
                        </div>
                    ))}
                    <div className='py-4'>
                        <Divider />
                    </div>
                    <form className='flex' onSubmit={submit}>
                        <div className='w-[97%] inline mr-2'>
                            <Input
                                label='Comment'
                                type='text'
                                {...register('message')}
                                disabled={mutation.isLoading}
                            />
                        </div>
                        <IconButton
                            type='submit'
                            className='flex items-center justify-center'
                            disabled={mutation.isLoading}
                        >
                            <MaterialIcon icon='send' />
                        </IconButton>
                    </form>
                </CardBody>
            </Card>
        </>
    );
};

export default Pond;
