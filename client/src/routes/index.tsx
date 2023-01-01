import React from 'react';
import { DefaultGenerics, Navigate, Route } from '@tanstack/react-location';
import Home from '@/pages/Home';
import { administratorRoutes } from './administrator';

export const routes: Route<DefaultGenerics>[] = [
    {
        path: '/',
        element: <Home />,
    },
    administratorRoutes,
    {
        element: <Navigate to='/' replace />,
    },
];
