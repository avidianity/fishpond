import { usePondComment, usePondCommentDelete } from '@/hooks/api/pond';
import { Modes, Nullable, SenderType } from '@/types/misc';
import { Comment } from '@/types/models/comment';
import { Sender } from '@/types/models/sender';
import {
    Card,
    CardBody,
    Typography,
    Input,
    IconButton,
} from '@material-tailwind/react';
import { Divider } from '@mui/material';
import dayjs from 'dayjs';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import MaterialIcon from '@/components/MaterialIcon';
import { useService } from '@/hooks';
import { StorageService } from '@/services/storage';
import { Asker } from '@/helpers';

type Input = {
    message: string;
};

type Props = {
    id: string;
    mode: Modes;
    comments: Comment[];
};

const Comments: FC<Props> = ({ mode, comments, id }) => {
    const { register, handleSubmit, reset } = useForm<Input>();
    const mutation = usePondComment(mode, id);
    const storage = useService(StorageService);
    const authId = storage.get('id');
    const destroy = usePondCommentDelete(mode);

    const submit = handleSubmit(async (payload) => {
        mutation.mutate(payload.message);
        reset();
    });

    const deleteComment = async (id: string) => {
        const proceed = await Asker.danger(
            'Are you sure you want to delete this comment?'
        );

        if (!proceed) {
            return;
        }

        destroy.mutate(id);
    };

    const getName = (sender: Nullable<Sender>, type: SenderType) => {
        if (!sender) {
            return 'Unknown';
        }

        if (type === 'administrator') {
            return sender.email;
        }

        return `${sender.first_name} ${sender.last_name}`;
    };

    return (
        <Card className='mt-20'>
            <CardBody>
                <div className='flex'>
                    <Typography variant='h5'>Comments</Typography>
                    <Typography variant='small' className='mt-1 ml-auto'>
                        {comments.length} Comments
                    </Typography>
                </div>
                <div className='py-4'>
                    <Divider />
                </div>
                {comments.map((comment, index) => (
                    <div
                        key={index}
                        className='py-3 px-6 my-2 border border-gray-200 rounded-lg'
                    >
                        <div className='flex mb-4'>
                            <span className='font-bold pt-2'>
                                {getName(comment.sender, comment.sender_type)}{' '}
                                {comment.sender.id === authId ? (
                                    <span>(Me)</span>
                                ) : null}
                            </span>
                            {comment.sender.id === authId ? (
                                <IconButton
                                    variant='text'
                                    color='red'
                                    size='sm'
                                    className='ml-2 mt-1'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        deleteComment(comment.id);
                                    }}
                                >
                                    <i className='fas fa-trash'></i>
                                </IconButton>
                            ) : null}
                            <span className='ml-auto'>
                                {dayjs(comment.updated_at).fromNow()}
                            </span>
                        </div>
                        <Typography>{comment.message}</Typography>
                    </div>
                ))}
                <div className='py-4'>
                    <Divider />
                </div>
                <form className='flex' onSubmit={submit}>
                    <div className='w-[97%] inline mr-2'>
                        <Input
                            label='Comment'
                            type='text'
                            {...register('message')}
                            disabled={mutation.isLoading}
                        />
                    </div>
                    <IconButton
                        type='submit'
                        className='flex items-center justify-center'
                        disabled={mutation.isLoading}
                    >
                        <MaterialIcon icon='send' />
                    </IconButton>
                </form>
            </CardBody>
        </Card>
    );
};

export default Comments;
