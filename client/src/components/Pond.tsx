import { calculateRatings, convertModePrefix, getStatusColor } from '@/helpers';
import { useService } from '@/hooks';
import { usePondRate } from '@/hooks/api/buyer/pond';
import { StorageService } from '@/services/storage';
import { Modes, Response } from '@/types/misc';
import type { Pond as Model, Pond } from '@/types/models/pond';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    CardFooter,
} from '@material-tailwind/react';
import { Divider } from '@mui/material';
import { Link, useNavigate } from '@tanstack/react-location';
import React, { FC } from 'react';
import ReactStars from 'react-stars';
import { Seller } from '@/types/models/seller';
import { HttpService } from '@/services/http';
import { Conversation } from '@/types/models/converstation';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { PondStatus } from '@/constants';
import Carousel from '@/components/Carousel';

type Props = {
    mode: Modes;
    data: Model;
    cardClassName?: string;
    headerClassName?: string;
    bodyClassName?: string;
    multiple?: boolean;
};

const Pond: FC<Props> = ({
    mode,
    data,
    cardClassName,
    headerClassName,
    bodyClassName,
    multiple,
}) => {
    const storage = useService(StorageService);
    const mutation = usePondRate(data.id);
    const http = useService(HttpService);
    const prefix = convertModePrefix(mode);
    const navigate = useNavigate();
    const user = storage.get('user');

    const rate = async (rating: number) => {
        mutation.mutate(rating);
    };

    const determineIfStarsAreEditable = () => {
        const type = storage.get<Modes>('type');

        return type === 'buyer';
    };

    const converse = async (seller: Seller, pond: Pond) => {
        try {
            const { data } = await http.post<Response<Conversation>>(
                `/v1/${prefix}/conversations`,
                {
                    receiver_type: 'seller',
                    receiver_id: seller.id,
                    pond_id: pond.id,
                }
            );

            const conversation = data.data;

            navigate({
                to: `/${mode}/dashboard/conversations/${conversation.id}`,
            });
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                console.error(error);
                toast.error(
                    'Unable to initiate conversation. Please try again later.'
                );
            }
        }
    };

    const pictures = [data.image.url, ...(data.images ?? [])];

    return (
        <Card className={cardClassName}>
            <CardHeader className={headerClassName}>
                <Carousel urls={pictures} />
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
                {data.owner ? (
                    <Typography variant='small' className='font-bold'>
                        <Link
                            to={`/${mode}/dashboard/user/${data.owner.id}`}
                            className='text-blue-500'
                        >
                            {data.owner.first_name} {data.owner.last_name}
                        </Link>
                        {data.owner.id !== user?.id ? (
                            <i
                                className='fas fa-sms ml-1 hover:text-blue-300 hover:cursor-pointer'
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (data.owner) {
                                        converse(data.owner, data);
                                    }
                                }}
                            />
                        ) : null}
                    </Typography>
                ) : null}
                <Typography variant='small' className='font-bold'>
                    {data.class}
                </Typography>
                <Typography variant='small' className='font-bold'>
                    SQM: {data.square_meters}
                </Typography>
                <Typography variant='small' className='font-bold'>
                    Price: {data.price}
                </Typography>
                <Typography variant='small' className='font-bold'>
                    Location:{' '}
                    <a
                        href={data.location_url ?? ''}
                        target='_blank'
                        rel='noreferrer'
                        className='text-blue-500 hover:underline'
                    >
                        View
                    </a>
                </Typography>
                <div className='pt-4 pb-2'>
                    <Divider />
                </div>
                {!multiple ? (
                    <Typography
                        variant='small'
                        className='mt-2 whitespace-pre-wrap inline-block font-bold'
                    >
                        {data.description}
                    </Typography>
                ) : null}
            </CardBody>
            <CardFooter divider>
                <div className='flex items-center justify-between'>
                    <div
                        className={`${
                            data.status === PondStatus.FOR_RENT ? '' : 'hidden'
                        }`}
                    >
                        {data.ratings ? (
                            <ReactStars
                                value={calculateRatings(data.ratings)}
                                edit={determineIfStarsAreEditable()}
                                onChange={(rating) => {
                                    if (determineIfStarsAreEditable()) {
                                        rate(rating);
                                    }
                                }}
                            />
                        ) : (
                            <Typography variant='small'>
                                <span className='font-bold'>No Ratings</span>
                            </Typography>
                        )}
                    </div>
                    <Typography
                        variant='small'
                        color={getStatusColor(data.status)}
                        className='flex gap-1 ml-auto'
                    >
                        <i className='fas fa-map-marker-alt fa-sm mt-1 text-gray-700' />
                        {data.status}
                    </Typography>
                </div>
                <div className='flex'>
                    <span className='ml-auto text-xs mt-3'>
                        {dayjs(data.created_at).format('MMMM DD, YYYY hh:mm A')}
                    </span>
                </div>
            </CardFooter>
        </Card>
    );
};

export default Pond;
