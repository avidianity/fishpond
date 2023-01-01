import React, { FC } from 'react';
import BaseLogin from '@/components/Auth/Login';
import { useService } from '@/hooks';
import { AuthService } from '@/services/administrator/auth';
import { Modes } from '@/constants';

const Login: FC = () => {
    const auth = useService(AuthService);

    return (
        <BaseLogin
            mode={Modes.ADMINISTRATOR}
            onSubmit={async (payload) => {
                return await auth.login(payload.email, payload.password);
            }}
        />
    );
};

export default Login;
