import { Asker } from '@/helpers';
import { Modes } from '@/types/misc';
import {
    Typography,
    Button,
    IconButton,
    MobileNav,
    Navbar as BaseNavbar,
} from '@material-tailwind/react';
import { Link, useNavigate } from '@tanstack/react-location';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Link = {
    to: string;
    title: string;
    exact?: boolean;
};

type Props = {
    mode: Modes;
    onLogout: () => Promise<void>;
    links: Link[];
};

const Navbar: FC<Props> = ({ mode, links, onLogout }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        const proceed = await Asker.notice('Are you sure you want to logout?');

        if (!proceed) {
            return;
        }

        await onLogout();

        toast.info('You have logged out.');

        navigate({
            to: `/${mode}/login`,
            replace: true,
        });
    };

    const navList = (
        <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
            {links.map((link, index) => (
                <Typography
                    key={index}
                    as='li'
                    variant='small'
                    color='blue-gray'
                    className='p-1 font-normal'
                >
                    <Link
                        to={`/${mode}/dashboard/${link.to}`}
                        className='flex items-center'
                        getActiveProps={() => ({
                            className:
                                'text-blue-600 border-b border-b-blue-600',
                        })}
                        activeOptions={{
                            exact: link.exact,
                        }}
                    >
                        {link.title}
                    </Link>
                </Typography>
            ))}
        </ul>
    );

    useEffect(() => {
        window.addEventListener(
            'resize',
            () => window.innerWidth >= 960 && setOpen(false)
        );
    }, []);

    return (
        <BaseNavbar className='mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 border border-gray-100'>
            <div className='container mx-auto flex items-center justify-between text-blue-gray-900'>
                <Typography
                    as='a'
                    href={`/${mode}/dashboard`}
                    variant='small'
                    className='mr-4 cursor-pointer py-1.5 font-normal'
                >
                    <span>Fishpond</span>
                </Typography>
                <div className='hidden lg:block'>{navList}</div>
                <Button
                    color='red'
                    type='button'
                    variant='gradient'
                    size='sm'
                    className='hidden lg:inline-block'
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }}
                >
                    <span>Logout</span>
                </Button>
                <IconButton
                    variant='text'
                    className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
                    ripple={false}
                    onClick={() => setOpen(!open)}
                >
                    {open ? (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            className='h-6 w-6'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M6 18L18 6M6 6l12 12'
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-6 w-6'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M4 6h16M4 12h16M4 18h16'
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <MobileNav open={open}>
                {navList}
                <Button
                    color='red'
                    type='button'
                    variant='gradient'
                    size='sm'
                    fullWidth
                    className='mb-2'
                    onClick={(e) => {
                        e.preventDefault();
                        logout();
                    }}
                >
                    <span>Logout</span>
                </Button>
            </MobileNav>
        </BaseNavbar>
    );
};

export default Navbar;
