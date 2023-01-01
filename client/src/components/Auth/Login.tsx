import { Modes } from '@/types/misc';
import { Button, Input } from '@material-tailwind/react';
import { Link } from '@tanstack/react-location';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import MaterialIcon from '@/components/MaterialIcon';

type Inputs = {
    email: string;
    password: string;
};

type Props = {
    mode: Modes;
    allowRegister?: boolean;
    onSubmit: (payload: Inputs) => Promise<void>;
};

const Login: FC<Props> = ({ mode, allowRegister, onSubmit }) => {
    const [processing, setProcessing] = useState(false);
    const { register, handleSubmit } = useForm<Inputs>();

    const submit = handleSubmit(async (payload) => {
        setProcessing(true);

        try {
            await onSubmit(payload);
            setProcessing(false);
        } catch (error) {
            setProcessing(false);
            throw error;
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
