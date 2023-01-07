import Container from '@/components/Container';
import MaterialIcon from '@/components/MaterialIcon';
import Navbar from '@/components/Navbar';
import { Modes } from '@/constants';
import { useService } from '@/hooks';
import { AuthService } from '@/services/seller/auth';
import { Outlet } from '@tanstack/react-location';
import React, { FC } from 'react';

const Dashboard: FC = () => {
    const auth = useService(AuthService);

    const logout = async () => {
        await auth.logout();
    };

    return (
        <main className='pt-4'>
            <Navbar
                onLogout={async () => {
                    await logout();
                }}
                mode={Modes.BUYER}
                links={[
                    {
                        to: '',
                        title: 'Ponds',
                        exact: true,
                    },
                    {
                        to: 'conversations',
                        title: <MaterialIcon icon='forum' />,
                    },
                ]}
            />
            <Container>
                <Outlet />
            </Container>
        </main>
    );
};

export default Dashboard;
