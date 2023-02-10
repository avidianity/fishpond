import React from 'react';
import { DefaultGenerics, Navigate, Route } from '@tanstack/react-location';
import Home from '@/pages/Home';
import { administratorRoutes } from '@/routes/administrator';
import { buyerRoutes } from '@/routes/buyer';
import { sellerRoutes } from '@/routes/seller';
import TermsAndConditions from '@/pages/TermsAndConditions';

export const routes: Route<DefaultGenerics>[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/terms-and-conditions',
        element: <TermsAndConditions />,
    },
    administratorRoutes,
    buyerRoutes,
    sellerRoutes,
    {
        element: <Navigate to='/' replace />,
    },
];
