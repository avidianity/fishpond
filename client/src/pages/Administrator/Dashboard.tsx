import Container from '@/components/Container';
import Navbar from '@/components/Navbar';
import { Modes } from '@/constants';
import { useService } from '@/hooks';
import { AuthService } from '@/services/administrator/auth';
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
                mode={Modes.ADMINISTRATOR}
                links={[
                    {
                        to: '',
                        title: 'Ponds',
                        exact: true,
                    },
                    {
                        to: 'sellers',
                        title: 'Sellers List',
                    },
                    {
                        to: 'buyers',
                        title: 'Buyers List',
                    },
                    {
                        to: 'issues',
                        title: 'Issues',
                    },
                    {
                        to: 'approvals',
                        title: 'Approval Requests',
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
