import React, { FC } from 'react';
import BaseRegister from '@/components/Auth/Register';
import { Modes } from '@/constants';
import { useService } from '@/hooks';
import { AuthService } from '@/services/seller/auth';

const Register: FC = () => {
    const auth = useService(AuthService);

    return (
        <BaseRegister
            mode={Modes.SELLER}
            onSubmit={async (payload) => {
                await auth.register(payload);
            }}
        />
    );
};

export default Register;
