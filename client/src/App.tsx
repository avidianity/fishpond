import React, { FC } from 'react';
import { ReactLocation, Router, Outlet } from '@tanstack/react-location';
import { routes } from '@/routes';

type Props = Record<string, unknown>;

const location = new ReactLocation();

const App: FC<Props> = () => {
    return (
        <>
            <Router location={location} routes={routes}>
                <Outlet />
            </Router>
        </>
    );
};

export default App;
