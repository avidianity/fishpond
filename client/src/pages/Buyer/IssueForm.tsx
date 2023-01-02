import { useService } from '@/hooks';
import { PondService } from '@/services/buyer/pond';
import { Button, Textarea, Typography } from '@material-tailwind/react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { isAxiosError } from 'axios';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Input = {
    message: string;
};

const IssueForm: FC = () => {
    const [processing, setProcessing] = useState(false);
    const { register, handleSubmit } = useForm<Input>();
    const pondService = useService(PondService);
    const match = useMatch();
    const navigate = useNavigate();

    const submit = handleSubmit(async (payload) => {
        setProcessing(true);

        try {
            await pondService.report(match.params.id, payload.message);
            toast.success('Pond reported successfully!');
            navigate({ to: `/buyer/dashboard/${match.params.id}` });
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                console.error(error);
                toast.error('Unable to report pond. Please try again later.');
            }
        } finally {
            setProcessing(false);
        }
    });

    return (
        <div className='px-4'>
            <Typography variant='h2' className='mb-2'>
                Report Pond
            </Typography>
            <form className='flex flex-wrap' onSubmit={submit}>
                <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
                    <div className='my-4'>
                        <Textarea
                            label='Issue'
                            {...register('message')}
                            disabled={processing}
                        />
                    </div>
                    <div className='mt-4'>
                        <Button type='submit' disabled={processing}>
                            Send
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default IssueForm;
