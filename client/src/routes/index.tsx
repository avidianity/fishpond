import React from 'react';
import { DefaultGenerics, Navigate, Route } from '@tanstack/react-location';
import Home from '@/pages/Home';
import { administratorRoutes } from '@/routes/administrator';
import { buyerRoutes } from '@/routes/buyer';

export const routes: Route<DefaultGenerics>[] = [
    {
        path: '/',
        element: <Home />,
    },
    administratorRoutes,
    buyerRoutes,
    {
        element: <Navigate to='/' replace />,
    },
];
