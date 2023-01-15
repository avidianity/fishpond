import { calculateRatings, convertModePrefix, getStatusColor } from '@/helpers';
import { useService } from '@/hooks';
import { usePondRate } from '@/hooks/api/buyer/pond';
import { StorageService } from '@/services/storage';
import { Modes, Response } from '@/types/misc';
import type { Pond as Model } from '@/types/models/pond';
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
import PicturesModal from '@/components/Modals/Pictures';
import { Seller } from '@/types/models/seller';
import { HttpService } from '@/services/http';
import { Conversation } from '@/types/models/converstation';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';

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
    const mutation = usePondRate(data.id);
    const http = useService(HttpService);
    const prefix = convertModePrefix(mode);
    const navigate = useNavigate();

    const rate = async (rating: number) => {
        mutation.mutate(rating);
    };

    const determineIfStarsAreEditable = () => {
        const type = storage.get<Modes>('type');

        return type === 'buyer';
    };

    const converse = async (seller: Seller) => {
        try {
            const { data } = await http.post<Response<Conversation>>(
                `/v1/${prefix}/conversations`,
                {
                    receiver_type: 'seller',
                    receiver_id: seller.id,
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
                {data.owner ? (
                    <Typography variant='small' className='font-bold'>
                        {data.owner.first_name} {data.owner.last_name}
                        <i
                            className='fas fa-sms ml-1 hover:text-blue-300 hover:cursor-pointer'
                            onClick={(e) => {
                                e.preventDefault();
                                if (data.owner) {
                                    converse(data.owner);
                                }
                            }}
                        />
                    </Typography>
                ) : null}

                <div className='pt-4 pb-2'>
                    <Divider />
                </div>
                <Typography variant='small' className='mt-2'>
                    {data.description}
                </Typography>
                <div className='py-4'>
                    {data.images && data.images.length > 0 ? (
                        <PicturesModal pictures={data.images} />
                    ) : null}
                </div>
            </CardBody>
            <CardFooter divider>
                <div className='flex items-center justify-between'>
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
                    <Typography
                        variant='small'
                        color={getStatusColor(data.status)}
                        className='flex gap-1'
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
