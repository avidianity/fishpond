import { FormMode, Valid } from '@/types/misc';
import {
    Avatar,
    Button,
    Input,
    Option,
    Select,
    Textarea,
    Typography,
} from '@material-tailwind/react';
import React, { FC, createRef, useEffect, useRef, useState } from 'react';
import { upperFirst } from 'lodash-es';
import { useForm } from 'react-hook-form';
import { PondPayload } from '@/types/payloads/pond';
import { usePondMutation } from '@/hooks/api/seller/pond';
import { PondClass, PondStatus } from '@/constants';
import { useService } from '@/hooks';
import { FileService } from '@/services/seller/file';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { PondService } from '@/services/seller/pond';
import { Divider } from '@mui/material';

type Props = {
    mode: FormMode;
};

const PondForm: FC<Props> = ({ mode }) => {
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState<string>(PondStatus.AVAILABLE);
    const [pondClass, setPondClass] = useState<string>(PondClass.A);
    const { register, handleSubmit, setValue } = useForm<PondPayload>();
    const mutation = usePondMutation(mode);
    const [preview, setPreview] = useState('https://via.placeholder.com/600');
    const fileService = useService(FileService);
    const pondService = useService(PondService);
    const fileRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const match = useMatch();
    const [uploading, setUploading] = useState(false);
    const [pictures, setPictures] = useState<string[]>([]);
    const pictureRefs = pictures.map(() => createRef<HTMLInputElement>());

    const addPictureElement = () => {
        setPictures([...pictures, 'https://via.placeholder.com/600']);
    };

    const removePictureElement = (index: number) => {
        pictures.splice(index, 1);
        setPictures([...pictures]);
    };

    const goBack = () => {
        navigate({ to: '/seller/dashboard/' });
    };

    const submit = handleSubmit(async (payload) => {
        setProcessing(true);
        payload.status = status as Valid;
        payload.image_url = preview;
        payload.images = pictures;
        payload.class = pondClass;
        try {
            await mutation.mutateAsync(payload);
            goBack();
        } catch (_) {
            //
        } finally {
            setProcessing(false);
        }
    });

    const fetch = async () => {
        try {
            const pond = await pondService.show(match.params.id);

            setValue('name', pond.name);
            setValue('description', pond.description);
            setValue('latitude', pond.latitude);
            setValue('longitude', pond.longitude);
            setValue('price', pond.price);
            setValue('square_meters', pond.square_meters);
            setValue('location_url', pond.location_url);

            setPondClass(pond.class ?? '');
            setStatus(pond.status);
            setPreview(pond.image.url);
            setPictures(pond.images ?? []);
        } catch (error) {
            console.error(error);
            toast.error('Unable to fetch pond data. Please try again later.');
            goBack();
        }
    };

    const uploadPicture = async (file: File, index: number) => {
        setUploading(true);

        toast.info('Uploading picture. Please wait.');

        try {
            const response = await fileService.upload(file);

            pictures.splice(index, 1, response.data.url);

            setPictures([...pictures]);

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

    useEffect(() => {
        if (mode === 'edit') {
            fetch();
        }
    }, []);

    return (
        <div className='px-4'>
            <Typography variant='h2' className='mb-2'>
                {upperFirst(mode)} Pond
            </Typography>
            <form className='flex flex-wrap' onSubmit={submit}>
                <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
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
                </div>
                <div className='w-full'>
                    <div className='my-4'>
                        <Typography variant='h6'>
                            Additional Pictures
                        </Typography>
                        <Button
                            color='indigo'
                            onClick={(e) => {
                                e.preventDefault();
                                addPictureElement();
                            }}
                            disabled={uploading}
                        >
                            Add Picture
                        </Button>
                        <div className='pb-2 pt-4'>
                            <Divider />
                        </div>
                        <div className='p-1 flex flex-wrap'>
                            {pictures.map((url, index) => (
                                <div key={index} className='m-2 flex flex-col'>
                                    <Button
                                        color='red'
                                        size='sm'
                                        className='mb-2'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            removePictureElement(index);
                                        }}
                                        disabled={uploading}
                                    >
                                        Remove
                                    </Button>
                                    <input
                                        ref={pictureRefs[index]}
                                        type='file'
                                        className='hidden'
                                        onChange={(e) => {
                                            if (
                                                e.target.files &&
                                                e.target.files.length > 0 &&
                                                !uploading
                                            ) {
                                                uploadPicture(
                                                    e.target.files[0],
                                                    index
                                                );
                                            }
                                        }}
                                    />
                                    <Avatar
                                        src={url}
                                        size='xxl'
                                        className={`shadow ${
                                            !uploading
                                                ? 'hover:cursor-pointer hover:shadow-lg'
                                                : ''
                                        }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (!uploading) {
                                                pictureRefs[
                                                    index
                                                ]?.current?.click();
                                            }
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
                    <div className='my-4'>
                        <Input
                            type='text'
                            label='Name'
                            {...register('name')}
                            disabled={processing}
                        />
                    </div>
                    <div className='my-4'>
                        <Select
                            label='Status'
                            disabled={processing}
                            onChange={(node) => {
                                const value = node?.toString();

                                if (value) {
                                    setStatus(value);
                                }
                            }}
                            value={status}
                        >
                            {Object.values(PondStatus)
                                .filter((status) => status !== PondStatus.ALL)
                                .map((status, index) => (
                                    <Option key={index} value={status}>
                                        {status}
                                    </Option>
                                ))}
                        </Select>
                    </div>
                    <div className='my-4'>
                        <Input
                            type='text'
                            label='Price'
                            {...register('price')}
                            disabled={processing}
                        />
                    </div>
                    <div className='my-4'>
                        <Input
                            type='url'
                            label='Location'
                            {...register('location_url')}
                            disabled={processing}
                        />
                    </div>
                    <div className='my-4'>
                        <Input
                            type='text'
                            label='SQM'
                            {...register('square_meters')}
                            disabled={processing}
                        />
                    </div>
                    <div className='my-4'>
                        <Select
                            label='Class'
                            disabled={processing}
                            onChange={(node) => {
                                const value = node?.toString();

                                if (value) {
                                    setPondClass(value);
                                }
                            }}
                            value={pondClass}
                        >
                            {Object.values(PondClass)
                                .filter(
                                    (pondClass) => pondClass !== PondClass.ALL
                                )
                                .map((name, index) => (
                                    <Option key={index} value={name}>
                                        {name}
                                    </Option>
                                ))}
                        </Select>
                    </div>
                    <div className='my-4'>
                        <Textarea
                            label='Description'
                            {...register('description')}
                            disabled={processing}
                        />
                    </div>
                    <div className='mt-4'>
                        <Button
                            type='submit'
                            disabled={processing || uploading}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PondForm;
