import { convertModePrefix } from '@/helpers';
import { useService } from '@/hooks';
import { HttpService } from '@/services/http';
import { StorageService } from '@/services/storage';
import { Modes, Response } from '@/types/misc';
import { Sender } from '@/types/models/sender';
import { Button, Input, Typography } from '@material-tailwind/react';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
    mode: Modes;
};

type Inputs = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

const Settings: FC<Props> = ({ mode }) => {
    const [processing, setProcessing] = useState(false);
    const storage = useService(StorageService);
    const http = useService(HttpService);
    const user = storage.get<Sender>('user');
    const { register, handleSubmit } = useForm<Inputs>({
        defaultValues: {
            first_name: user?.first_name,
            last_name: user?.last_name,
            email: user?.email,
        },
    });

    const submit = handleSubmit(async (payload) => {
        setProcessing(true);

        try {
            const prefix = convertModePrefix(mode);

            const { data } = await http.post<Response>(
                `/v1/${prefix}/auth/update`,
                payload
            );
            storage.set('user', data);
            toast.success('Settings saved successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Unable to save settings. Please try again later.');
        } finally {
            setProcessing(false);
        }
    });

    return (
        <div className='px-4'>
            <Typography variant='h2' className='mb-2'>
                Settings
            </Typography>
            <form className='flex flex-wrap' onSubmit={submit}>
                <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
                    {mode !== 'administrator' ? (
                        <>
                            <div className='my-4'>
                                <Input
                                    type='text'
                                    label='First Name'
                                    {...register('first_name')}
                                    disabled={processing}
                                />
                            </div>
                            <div className='my-4'>
                                <Input
                                    type='text'
                                    label='Last Name'
                                    {...register('last_name')}
                                    disabled={processing}
                                />
                            </div>
                        </>
                    ) : null}
                    {mode === 'administrator' ? (
                        <div className='my-4'>
                            <Input
                                type='email'
                                label='Email'
                                {...register('email')}
                                disabled={processing}
                            />
                        </div>
                    ) : null}
                    <div className='my-4'>
                        <Input
                            type='password'
                            label='Password'
                            {...register('password')}
                            disabled={processing}
                        />
                    </div>
                    <div className='mt-4'>
                        <Button type='submit' disabled={processing}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Settings;
