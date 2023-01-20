import { convertModePrefix } from '@/helpers';
import { useService } from '@/hooks';
import { HttpService } from '@/services/http';
import { Modes as ModeType, Response } from '@/types/misc';
import { Seller } from '@/types/models/seller';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
} from '@material-tailwind/react';
import { useMatch } from '@tanstack/react-location';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import Pond from '@/components/Pond';
import { Modes } from '@/constants';

type Props = {
    mode: ModeType;
};

const User: FC<Props> = ({ mode }) => {
    const match = useMatch();
    const prefix = convertModePrefix(mode);
    const id = match.params.id;
    const http = useService(HttpService);
    const { data } = useQuery(id, async () => {
        const { data } = await http.get<Response<Seller>>(
            `/v1/${prefix}/owners/${id}`
        );

        return data.data;
    });

    if (!data) {
        return null;
    }

    return (
        <div className='flex flex-col items-center'>
            <Card className='w-80 md:w-96'>
                <CardHeader floated={false} className='h-[420px] md:h-[520px]'>
                    <img
                        src={
                            data.image.url ??
                            'https://via.placeholder.com/600x900'
                        }
                        alt='profile-picture'
                        className='object-cover'
                    />
                </CardHeader>
                <CardBody className='text-center'>
                    <Typography variant='h4' color='blue-gray' className='mb-2'>
                        {data.first_name} {data.last_name}
                    </Typography>
                    <Typography
                        color='gray'
                        className='font-medium'
                        textGradient
                    >
                        {data.email}
                    </Typography>
                    <Typography
                        color='gray'
                        className='font-medium'
                        textGradient
                    >
                        {data.phone}
                    </Typography>
                    <Typography
                        color='gray'
                        className='font-medium'
                        textGradient
                    >
                        {data.address}
                    </Typography>
                </CardBody>
            </Card>
            <hr className='my-10 w-full' />
            <div className='flex flex-wrap'>
                {data.ponds?.map((pond, index) => (
                    <div
                        className='w-full lg:w-1/2 py-8 px-4 flex items-center justify-center'
                        key={index}
                    >
                        <Pond
                            mode={Modes.SELLER}
                            data={pond}
                            cardClassName='w-80 border border-gray-100 shadow-lg'
                            headerClassName='relative h-56'
                            bodyClassName='text-center'
                            multiple
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default User;
