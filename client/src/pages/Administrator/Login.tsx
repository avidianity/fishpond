import React, { FC } from 'react';
import BaseLogin from '@/components/Auth/Login';
import { useService } from '@/hooks';
import { AuthService } from '@/services/administrator/auth';
import { StorageService } from '@/services/storage';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from '@tanstack/react-location';
import { Modes } from '@/constants';

const Login: FC = () => {
    const auth = useService(AuthService);
    const storage = useService(StorageService);
    const navigate = useNavigate();

    return (
        <BaseLogin
            mode={Modes.ADMINISTRATOR}
            onSubmit={async (payload) => {
                try {
                    const response = await auth.login(
                        payload.email,
                        payload.password
                    );

                    storage.set('token', response.access.token);
                    toast.success(`Welcome back, ${response.data.email}!`);
                    navigate({
                        to: '/administrator/dashboard/',
                        replace: true,
                    });
                } catch (error) {
                    if (error instanceof AxiosError) {
                        toast.error(error.response?.data?.message);
                    } else {
                        console.log(error);
                        toast.error(
                            'Something went wrong. Please try again later.'
                        );
                    }
                }
            }}
        />
    );
};

export default Login;
