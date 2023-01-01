import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/tailwind.css';
import { ThemeProvider } from '@material-tailwind/react';
import App from '@/App';
import '@fontsource/montserrat';
import 'material-icons/iconfont/material-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
            <ToastContainer />
        </ThemeProvider>
    </React.StrictMode>
);
