import React from 'react';
import { Route, DefaultGenerics, Outlet } from '@tanstack/react-location';
import Login from '@/pages/Buyer/Login';
import Dashboard from '@/pages/Buyer/Dashboard';
import Ponds from '@/pages/Buyer/Ponds';
import Pond from '@/pages/Buyer/Pond';
import Settings from '@/components/Settings';
import { Modes } from '@/constants';
import Register from '@/pages/Buyer/Register';
import Send from '@/components/Auth/ForgotPassword/Send';
import Verify from '@/components/Auth/ForgotPassword/Verify';
import Finalize from '@/components/Auth/ForgotPassword/Finalize';
import IssueForm from '@/pages/Buyer/IssueForm';
import Conversations from '@/pages/Buyer/Conversations';
import Conversation from '@/pages/Buyer/Conversation';
import User from '@/components/User';

export const buyerRoutes: Route<DefaultGenerics> = {
    path: 'buyer',
    element: <Outlet />,
    children: [
        {
            path: 'login',
            element: <Login />,
        },
        {
            path: 'register',
            element: <Register />,
        },
        {
            path: 'forgot-password',
            element: <Outlet />,
            children: [
                {
                    path: '/',
                    element: <Send mode={Modes.BUYER} />,
                },
                {
                    path: 'verify',
                    element: <Verify mode={Modes.BUYER} />,
                },
                {
                    path: 'finalize',
                    element: <Finalize mode={Modes.BUYER} />,
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
                    path: 'settings',
                    element: <Settings mode={Modes.BUYER} />,
                },
                {
                    path: 'user/:id',
                    element: <User mode={Modes.BUYER} />,
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
                    path: ':id/report',
                    element: <IssueForm />,
                },
                {
                    path: ':id',
                    element: <Pond />,
                },
            ],
        },
    ],
};
