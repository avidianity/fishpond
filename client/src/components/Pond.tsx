import { calculateRatings } from '@/helpers';
import { useService } from '@/hooks';
import { StorageService } from '@/services/storage';
import { Modes } from '@/types/misc';
import type { Pond as Model } from '@/types/models/pond';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    CardFooter,
} from '@material-tailwind/react';
import { Divider } from '@mui/material';
import { Link } from '@tanstack/react-location';
import React, { FC } from 'react';
import ReactStars from 'react-stars';

type Props = {
    mode: Modes;
    data: Model;
    cardClassName?: string;
    headerClassName?: string;
    bodyClassName?: string;
};

const Pond: FC<Props> = ({
    mode,
    data,
    cardClassName,
    headerClassName,
    bodyClassName,
}) => {
    const storage = useService(StorageService);

    const determineIfStarsAreEditable = () => {
        const type = storage.get<Modes>('type');

        return type === 'buyer';
    };

    return (
        <Card className={cardClassName}>
            <CardHeader className={headerClassName}>
                <img
                    src={data.image.url}
                    alt='img-blur-shadow'
                    className='h-full w-full object-cover'
                />
            </CardHeader>
            <CardBody className={bodyClassName}>
                <Typography variant='h5' className='mb-2'>
                    <Link
                        to={`/${mode}/dashboard/${data.id}`}
                        className='text-blue-500 hover:underline'
                    >
                        {data.name}
                    </Link>
                </Typography>
                <Typography variant='small' className='font-bold'>
                    {data.owner?.first_name} {data.owner?.last_name}
                </Typography>
                <div className='pt-4 pb-2'>
                    <Divider />
                </div>
                <Typography variant='small' className='mt-2'>
                    {data.description}
                </Typography>
            </CardBody>
            <CardFooter
                divider
                className='flex items-center justify-between py-3'
            >
                <Typography variant='small'>
                    {data.ratings ? (
                        <ReactStars
                            value={calculateRatings(data.ratings)}
                            edit={determineIfStarsAreEditable()}
                        />
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
