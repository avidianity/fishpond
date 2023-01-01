import React from 'react';
import { Route, DefaultGenerics, Outlet } from '@tanstack/react-location';
import Login from '@/pages/Administrator/Login';
import Dashboard from '@/pages/Administrator/Dashboard';
import Sellers from '@/pages/Administrator/Sellers';
import Buyers from '@/pages/Administrator/Buyers';
import Issues from '@/pages/Administrator/Issues';
import Ponds from '@/pages/Administrator/Ponds';
import Pond from '@/pages/Administrator/Pond';

export const administratorRoutes: Route<DefaultGenerics> = {
    path: 'administrator',
    element: <Outlet />,
    children: [
        {
            path: 'login',
            element: <Login />,
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
                    path: ':id',
                    element: <Pond />,
                },
            ],
        },
    ],
};
