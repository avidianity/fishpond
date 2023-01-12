import { Asker } from '@/helpers';
import { useService } from '@/hooks';
import { useNotificationList } from '@/hooks/api/notification';
import { StorageService } from '@/services/storage';
import { Modes } from '@/types/misc';
import { Notification } from '@/types/models/notification';
import {
    Typography,
    Button,
    IconButton,
    MobileNav,
    Navbar as BaseNavbar,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from '@material-tailwind/react';
import { Link, useNavigate } from '@tanstack/react-location';
import dayjs from 'dayjs';
import React, { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

type Link = {
    to: string;
    title: string | JSX.Element;
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
    const notifications = useNotificationList(mode);
    const storage = useService(StorageService);
    const id = storage.get('id');

    const logout = async () => {
        const proceed = await Asker.notice('Are you sure you want to logout?');

        if (!proceed) {
            return;
        }

        await onLogout();

        toast.info('You have logged out.');

        navigate({
            to: '/',
            replace: true,
        });
    };

    const go = (to: string) => navigate({ to });

    const getNotificationMessage = (notification: Notification) => {
        switch (notification.type) {
            case 'new-comment':
                return `Someone has commented on ${
                    notification.data.owner_id === id ? 'your' : 'a'
                } pond.`;
        }
    };

    const handleNotificationAction = (notification: Notification) => {
        switch (notification.type) {
            case 'new-comment':
                navigate({
                    to: `/${mode}/dashboard/${notification.data.pond_id}`,
                });
                break;
        }
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

    const menu = (mobile: boolean) => (
        <div>
            <Menu>
                <MenuHandler>
                    <IconButton variant='text' className='mr-1'>
                        <i className='fas fa-bell fa-2x'></i>
                    </IconButton>
                </MenuHandler>
                <MenuList>
                    {notifications.map((notification, index) => (
                        <MenuItem
                            key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNotificationAction(notification);
                            }}
                        >
                            <span className='mx-2'>
                                {getNotificationMessage(notification)}{' '}
                            </span>
                            <span className='font-bold ml-auto'>
                                {dayjs(notification.created_at).fromNow()}
                            </span>
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
            <IconButton
                variant='text'
                onClick={(e) => {
                    e.preventDefault();
                    navigate({ to: `/${mode}/dashboard/conversations` });
                }}
                className='mr-2'
            >
                <i className='fas fa-comment fa-2x'></i>
            </IconButton>
            <Menu>
                <MenuHandler>
                    <Button
                        color='blue'
                        type='button'
                        variant='gradient'
                        size='sm'
                        className={
                            mobile
                                ? 'hidden lg:inline-block'
                                : 'inline-block lg:hidden'
                        }
                    >
                        <span>Menu</span>
                    </Button>
                </MenuHandler>
                <MenuList>
                    <MenuItem
                        onClick={(e) => {
                            e.preventDefault();
                            go(`/${mode}/dashboard/settings`);
                        }}
                    >
                        Settings
                    </MenuItem>
                    <MenuItem
                        onClick={(e) => {
                            e.preventDefault();
                            logout();
                        }}
                    >
                        Logout
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
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
                    href={`/${mode}/dashboard/`}
                    variant='small'
                    className='mr-4 cursor-pointer py-1.5 font-normal italic'
                >
                    <span>LookApond</span>
                </Typography>
                <div className='hidden lg:block'>{navList}</div>
                {menu(true)}
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
                {menu(false)}
            </MobileNav>
        </BaseNavbar>
    );
};

export default Navbar;
