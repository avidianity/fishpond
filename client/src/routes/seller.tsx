import React from 'react';
import { Route, DefaultGenerics, Outlet } from '@tanstack/react-location';
import Login from '@/pages/Seller/Login';
import Dashboard from '@/pages/Seller/Dashboard';
import Ponds from '@/pages/Seller/Ponds';
import Pond from '@/pages/Seller/Pond';
import Settings from '@/components/Settings';
import { Modes } from '@/constants';
import Register from '@/pages/Seller/Register';
import Send from '@/components/Auth/ForgotPassword/Send';
import Verify from '@/components/Auth/ForgotPassword/Verify';
import Finalize from '@/components/Auth/ForgotPassword/Finalize';
import PondForm from '@/pages/Seller/PondForm';
import Conversation from '@/pages/Seller/Conversation';
import Conversations from '@/pages/Seller/Conversations';
import User from '@/components/User';

export const sellerRoutes: Route<DefaultGenerics> = {
    path: 'seller',
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
                    element: <Send mode={Modes.SELLER} />,
                },
                {
                    path: 'verify',
                    element: <Verify mode={Modes.SELLER} />,
                },
                {
                    path: 'finalize',
                    element: <Finalize mode={Modes.SELLER} />,
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
                    element: <Settings mode={Modes.SELLER} />,
                },
                {
                    path: 'user/:id',
                    element: <User mode={Modes.SELLER} />,
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
                    path: 'add',
                    element: <PondForm mode='add' />,
                },
                {
                    path: ':id/edit',
                    element: <PondForm mode='edit' />,
                },
                {
                    path: ':id',
                    element: <Pond />,
                },
            ],
        },
    ],
};
