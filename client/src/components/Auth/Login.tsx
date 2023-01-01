import type { Modes as Mode } from '@/types/misc';
import { Button, Input } from '@material-tailwind/react';
import { Link, useNavigate } from '@tanstack/react-location';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import MaterialIcon from '@/components/MaterialIcon';
import { Modes } from '@/constants';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useService } from '@/hooks';
import { StorageService } from '@/services/storage';
import { AuthResponse } from '@/types/responses/auth';

type Inputs = {
    email: string;
    password: string;
};

type Props = {
    mode: Mode;
    allowRegister?: boolean;
    onSubmit: (payload: Inputs) => Promise<AuthResponse>;
};

const Login: FC<Props> = ({ mode, allowRegister, onSubmit }) => {
    const [processing, setProcessing] = useState(false);
    const { register, handleSubmit } = useForm<Inputs>();
    const navigate = useNavigate();
    const storage = useService(StorageService);

    const submit = handleSubmit(async (payload) => {
        setProcessing(true);

        try {
            const response = await onSubmit(payload);

            storage.set('token', response.access.token);
            storage.set('type', response.type);

            let userName = '';

            if (response.type === Modes.ADMINISTRATOR) {
                userName = response.data.email;
            } else {
                userName = `${response.data.first_name} ${response.data.last_name}`;
            }

            toast.success(`Welcome back, ${userName}!`);
            navigate({
                to: `/${mode}/dashboard/`,
                replace: true,
            });
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                console.log(error);
                toast.error('Something went wrong. Please try again later.');
            }
        } finally {
            setProcessing(false);
        }
    });

    return (
        <div className='h-screen w-screen flex items-center justify-center'>
            <div className='px-14 py-20 shadow-lg border border-gray-100 rounded-xl text-center'>
                <h2 className='text-4xl'>Sign In</h2>
                <p className='text-gray-500 mt-4'>
                    Welcome back! Sign in to get started
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
                    <div className='my-4'>
                        <Input
                            type='password'
                            label='Password'
                            {...register('password')}
                            disabled={processing}
                        />
                    </div>
                    <div className='my-4'>
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={processing}
                        >
                            {!processing ? (
                                'Sign In'
                            ) : (
                                <MaterialIcon icon='pending' size={20} />
                            )}
                        </Button>
                        <Link
                            to={`/${mode}/forgot-password`}
                            className='text-blue-500 hover:underline text-sm text-left mt-4 block'
                        >
                            Forgot Password?
                        </Link>
                        {allowRegister ? (
                            <p className='text-sm text-gray-500 mt-2 text-left'>
                                Don&apos;t have an account?{' '}
                                <Link
                                    to={`/${mode}/register`}
                                    className='text-blue-500 hover:underline'
                                >
                                    Register
                                </Link>
                            </p>
                        ) : null}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
