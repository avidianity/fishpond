import React from 'react';
import { Route, DefaultGenerics, Outlet } from '@tanstack/react-location';
import Login from '@/pages/Administrator/Login';
import Dashboard from '@/pages/Administrator/Dashboard';
import Sellers from '@/pages/Administrator/Sellers';
import Buyers from '@/pages/Administrator/Buyers';
import Issues from '@/pages/Administrator/Issues';
import Ponds from '@/pages/Administrator/Ponds';
import Pond from '@/pages/Administrator/Pond';
import Settings from '@/components/Settings';
import { Modes } from '@/constants';
import Send from '@/components/Auth/ForgotPassword/Send';
import Verify from '@/components/Auth/ForgotPassword/Verify';
import Finalize from '@/components/Auth/ForgotPassword/Finalize';
import Conversation from '@/pages/Administrator/Conversation';
import Conversations from '@/pages/Administrator/Conversations';
import Approvals from '@/pages/Administrator/Approvals';
import User from '@/components/User';

export const administratorRoutes: Route<DefaultGenerics> = {
    path: 'administrator',
    element: <Outlet />,
    children: [
        {
            path: 'login',
            element: <Login />,
        },
        {
            path: 'forgot-password',
            element: <Outlet />,
            children: [
                {
                    path: '/',
                    element: <Send mode={Modes.ADMINISTRATOR} />,
                },
                {
                    path: 'verify',
                    element: <Verify mode={Modes.ADMINISTRATOR} />,
                },
                {
                    path: 'finalize',
                    element: <Finalize mode={Modes.ADMINISTRATOR} />,
                },
            ],
        },
        {
            path: 'dashboard',
            element: <Dashboard />,
            children: [
                {
                    path: '/',
                    element: <Ponds />,
                },
                {
                    path: 'sellers',
                    element: <Sellers />,
                },
                {
                    path: 'buyers',
                    element: <Buyers />,
                },
                {
                    path: 'issues',
                    element: <Issues />,
                },
                {
                    path: 'settings',
                    element: <Settings mode={Modes.ADMINISTRATOR} />,
                },
                {
                    path: 'user/:id',
                    element: <User mode={Modes.ADMINISTRATOR} />,
                },
                {
                    path: 'approvals',
                    element: <Approvals />,
                },
                {
                    path: 'conversations/:id',
                    element: <Conversation />,
                },
                {
                    path: 'conversations',
                    element: <Conversations />,
                },
                {
                    path: ':id',
                    element: <Pond />,
                },
            ],
        },
    ],
};
