import { Modes } from '@/types/misc';
import type { Pond as Model } from '@/types/models/pond';
import { Rating } from '@/types/models/rating';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    CardFooter,
} from '@material-tailwind/react';
import { Link } from '@tanstack/react-location';
import React, { FC } from 'react';

type Props = {
    mode: Modes;
    data: Model;
};

const Pond: FC<Props> = ({ mode, data }) => {
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

    return (
        <Card className='w-80 border border-gray-100 shadow-lg'>
            <CardHeader className='relative h-56'>
                <img
                    src={data.image.url}
                    alt='img-blur-shadow'
                    className='h-full w-full object-cover'
                />
            </CardHeader>
            <CardBody className='text-center'>
                <Typography variant='h5' className='mb-2'>
                    <Link
                        to={`/${mode}/dashboard/${data.id}`}
                        className='text-blue-500 hover:underline'
                    >
                        {data.name}
                    </Link>
                </Typography>
                <Typography>{data.description}</Typography>
            </CardBody>
            <CardFooter
                divider
                className='flex items-center justify-between py-3'
            >
                <Typography variant='small'>
                    {data.ratings ? (
                        <span className='font-bold'>
                            {calculateRatings(data.ratings)}
                        </span>
                    ) : (
                        <span className='font-bold'>No Ratings</span>
                    )}
                </Typography>
                <Typography variant='small' color='gray' className='flex gap-1'>
                    <i className='fas fa-map-marker-alt fa-sm mt-[3px]' />
                    {data.status}
                </Typography>
            </CardFooter>
        </Card>
    );
};

export default Pond;
