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
import React, { FC, useEffect, useRef, useState } from 'react';
import { upperFirst } from 'lodash-es';
import { useForm } from 'react-hook-form';
import { PondPayload } from '@/types/payloads/pond';
import { usePondMutation } from '@/hooks/api/seller/pond';
import { PondStatus } from '@/constants';
import { useService } from '@/hooks';
import { FileService } from '@/services/seller/file';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { PondService } from '@/services/seller/pond';

type Props = {
    mode: FormMode;
};

const PondForm: FC<Props> = ({ mode }) => {
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState<string>(PondStatus.AVAILABLE);
    const { register, handleSubmit, setValue } = useForm<PondPayload>();
    const mutation = usePondMutation(mode);
    const [preview, setPreview] = useState('https://via.placeholder.com/600');
    const fileService = useService(FileService);
    const pondService = useService(PondService);
    const fileRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const match = useMatch();

    const goBack = () => {
        navigate({ to: '/seller/dashboard/' });
    };

    const submit = handleSubmit(async (payload) => {
        setProcessing(true);
        payload.status = status as Valid;
        payload.image_url = preview;
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
            setStatus(pond.status);
            setPreview(pond.image.url);
        } catch (error) {
            console.error(error);
            toast.error('Unable to fetch pond data. Please try again later.');
            goBack();
        }
    };

    const upload = async (file: File) => {
        try {
            const response = await fileService.upload(file);
            setPreview(response.data.url);
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                console.error(error);
                toast.error('Unable to upload image. Please try again later.');
            }
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
                                    e.target.files.length > 0
                                ) {
                                    upload(e.target.files[0]);
                                }
                            }}
                        />
                        <Avatar
                            src={preview}
                            variant='circular'
                            size='xxl'
                            className='hover:cursor-pointer hover:shadow-lg'
                            onClick={(e) => {
                                e.preventDefault();
                                fileRef.current?.click();
                            }}
                        />
                    </div>
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
                            {Object.values(PondStatus).map((status, index) => (
                                <Option key={index} value={status}>
                                    {status}
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
                        <Button type='submit' disabled={processing}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PondForm;
