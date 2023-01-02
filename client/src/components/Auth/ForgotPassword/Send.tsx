import { Modes } from '@/types/misc';
import { Button, Input } from '@material-tailwind/react';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import MaterialIcon from '@/components/MaterialIcon';
import { useService } from '@/hooks';
import { HttpService } from '@/services/http';
import { toast } from 'react-toastify';
import { StorageService } from '@/services/storage';
import { useNavigate } from '@tanstack/react-location';
import { isAxiosError } from 'axios';
import { convertModePrefix } from '@/helpers';

type Props = {
    mode: Modes;
};

type Input = {
    email: string;
};

type Response = {
    message: string;
    otp_id: string;
};

const Send: FC<Props> = ({ mode }) => {
    const { register, handleSubmit } = useForm<Input>();
    const [processing, setProcessing] = useState(false);
    const http = useService(HttpService);
    const storage = useService(StorageService);
    const navigate = useNavigate();

    const submit = handleSubmit(async (payload) => {
        setProcessing(true);

        try {
            const prefix = convertModePrefix(mode);

            const { data } = await http.post<Response>(
                `/v1/${prefix}/auth/forgot-password/send`,
                payload
            );

            storage.set('otp_id', data.otp_id);
            navigate({ to: `/${mode}/forgot-password/verify` });
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                console.error(error);
                toast.error(
                    'Unable to process request. Please try again later.'
                );
            }
        } finally {
            setProcessing(false);
        }
    });

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='px-14 py-20 shadow-lg border border-gray-100 rounded-xl text-center'>
                <h2 className='text-4xl'>Forgot Password</h2>
                <p className='text-gray-500 mt-4'>
                    Sorry to hear that! Enter your email to get started
                </p>
                <form className='mt-5' onSubmit={submit}>
                    <div className='my-4'>
                        <Input
                            type='email'
                            label='Email'
                            {...register('email')}
                            disabled={processing}
                        />
                    </div>
                    <div className='mb-4'>
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={processing}
                        >
                            {!processing ? (
                                'Submit'
                            ) : (
                                <MaterialIcon icon='pending' size={20} />
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Send;
