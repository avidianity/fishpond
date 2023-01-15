import type { Modes as Mode } from '@/types/misc';
import { Button, Input } from '@material-tailwind/react';
import { Link, useNavigate } from '@tanstack/react-location';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import MaterialIcon from '@/components/MaterialIcon';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import type { Register } from '@/types/requests/register';

type Inputs = Register;

type Props = {
    mode: Omit<Mode, 'administrator'>;
    onSubmit: (payload: Inputs) => Promise<void>;
};

const Register: FC<Props> = ({ mode, onSubmit }) => {
    const [processing, setProcessing] = useState(false);
    const { register, handleSubmit } = useForm<Inputs>();
    const navigate = useNavigate();

    const submit = handleSubmit(async (payload) => {
        setProcessing(true);

        try {
            await onSubmit(payload);

            toast.success(
                'Registered successfully! Check your email to verify your account.'
            );

            navigate({
                to: `/${mode}/login`,
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
                            type='text'
                            label='First Name'
                            {...register('first_name')}
                            disabled={processing}
                        />
                    </div>
                    <div className='my-4'>
                        <Input
                            type='text'
                            label='Last Name'
                            {...register('last_name')}
                            disabled={processing}
                        />
                    </div>
                    <div className='my-4'>
                        <Input
                            type='email'
                            label='Email'
                            {...register('email')}
                            disabled={processing}
                        />
                    </div>
                    <div className='mt-4 mb-2'>
                        <Input
                            type='password'
                            label='Password'
                            {...register('password')}
                            disabled={processing}
                        />
                    </div>
                    <div className='mt-4 mb-2'>
                        <Input
                            type='password'
                            label='Repeat Password'
                            {...register('password_confirmation')}
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
                                'Sign Up'
                            ) : (
                                <MaterialIcon icon='pending' size={20} />
                            )}
                        </Button>
                        <p className='text-sm text-gray-500 mt-2 text-left'>
                            Already have an account?{' '}
                            <Link
                                to={`/${mode}/login`}
                                className='text-blue-500 hover:underline'
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
