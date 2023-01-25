import { convertModePrefix, parseImageUrl } from '@/helpers';
import { useService } from '@/hooks';
import { HttpService } from '@/services/http';
import { FileService } from '@/services/seller/file';
import { StorageService } from '@/services/storage';
import { Modes, Nullable, Response } from '@/types/misc';
import { Sender } from '@/types/models/sender';
import { Avatar, Button, Input, Typography } from '@material-tailwind/react';
import { isAxiosError } from 'axios';
import React, { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
    mode: Modes;
};

type Inputs = {
    first_name: string;
    last_name: string;
    email: string;
    phone: Nullable<string>;
    address: Nullable<string>;
    image_url: Nullable<string>;
    password?: string;
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
            address: user?.address,
            phone: user?.phone,
        },
    });
    const fileService = useService(FileService);
    const fileRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(parseImageUrl(user?.image));

    const upload = async (file: File) => {
        setUploading(true);

        toast.info('Uploading picture. Please wait.');

        try {
            const response = await fileService.upload(file);
            setPreview(response.data.url);

            toast.info('Picture uploaded.');
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                console.error(error);
                toast.error('Unable to upload image. Please try again later.');
            }
        } finally {
            setUploading(false);
        }
    };

    const submit = handleSubmit(async (payload) => {
        setProcessing(true);

        try {
            payload.image_url = preview;

            if (payload.password?.length === 0) {
                delete payload.password;
            }

            const prefix = convertModePrefix(mode);

            const { data } = await http.post<Response>(
                `/v1/${prefix}/auth/update`,
                payload
            );
            storage.set('user', data.data);
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
                            <div className='my-4 flex justify-center'>
                                <input
                                    ref={fileRef}
                                    type='file'
                                    className='hidden'
                                    onChange={(e) => {
                                        if (
                                            e.target.files &&
                                            e.target.files.length > 0 &&
                                            !uploading
                                        ) {
                                            upload(e.target.files[0]);
                                        }
                                    }}
                                />
                                <Avatar
                                    src={preview}
                                    variant='circular'
                                    size='xxl'
                                    className={`shadow ${
                                        !uploading
                                            ? 'hover:cursor-pointer hover:shadow-lg'
                                            : ''
                                    }`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (!uploading) {
                                            fileRef.current?.click();
                                        }
                                    }}
                                />
                            </div>
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
                            <div className='my-4'>
                                <Input
                                    type='text'
                                    label='Address'
                                    {...register('address')}
                                    disabled={processing}
                                />
                            </div>
                            <div className='my-4'>
                                <Input
                                    type='text'
                                    label='Mobile Number'
                                    {...register('phone')}
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
