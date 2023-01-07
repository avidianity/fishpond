import { useService } from '@/hooks';
import { useConversation } from '@/hooks/api/conversation';
import { StorageService } from '@/services/storage';
import { ChatUser, Modes } from '@/types/misc';
import { Conversation } from '@/types/models/converstation';
import { IconButton, Input } from '@material-tailwind/react';
import { useMatch } from '@tanstack/react-location';
import { isAxiosError } from 'axios';
import React, { FC, Fragment, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import SenderMessage from '@/components/Conversations/SenderMessage';
import ReceiverMessage from '@/components/Conversations/ReceiverMessage';

type Inputs = {
    message: string;
};

type Props = {
    mode: Modes;
    onMessage: (message: string) => Promise<void>;
    onUpload: (file: File) => Promise<void>;
    onClose: () => void;
};

const Chat: FC<Props> = ({ mode, onMessage, onUpload, onClose }) => {
    const [processing, setProcessing] = useState(false);
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const formRef = useRef<HTMLFormElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const storage = useService(StorageService);
    const id = storage.get('id');
    const match = useMatch();
    const conversation = useConversation(mode, match.params.id);

    const upload = async (file: File) => {
        setProcessing(true);

        try {
            await onUpload(file);
            formRef.current?.reset();
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                console.error(error);
                toast.error(
                    'Unable to send attachment. Please try again later.'
                );
            }
        } finally {
            setProcessing(false);
        }
    };

    const submit = handleSubmit(async (payload) => {
        setProcessing(true);

        try {
            if (payload.message.length > 0) {
                await onMessage(payload.message);
                reset();
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                console.error(error);
                toast.error('Unable to send message. Please try again later.');
            }
        } finally {
            setProcessing(false);
        }
    });

    const getReceiver = (conversation: Conversation) => {
        if (conversation.receiver.id === id) {
            return conversation.sender;
        }

        return conversation.receiver;
    };

    const getName = (receiver: ChatUser) => {
        if (receiver.type === 'administrator') {
            return receiver.email;
        }

        return `${receiver.first_name} ${receiver.last_name}`;
    };

    if (!conversation) {
        return null;
    }

    const receiver = getReceiver(conversation);

    return (
        <div className='w-full border flex flex-col'>
            <div className='py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center'>
                <div className='flex items-center w-full'>
                    <div>
                        <img
                            className='w-10 h-10 rounded-full'
                            src='https://via.placeholder.com/600'
                        />
                    </div>
                    <div className='ml-4'>
                        <p className='text-grey-darkest'>{getName(receiver)}</p>
                    </div>
                    <div className='ml-auto'>
                        <IconButton
                            size='sm'
                            color='teal'
                            onClick={(e) => {
                                e.preventDefault();
                                onClose();
                            }}
                        >
                            <i className='fas fa-undo'></i>
                        </IconButton>
                    </div>
                </div>
            </div>
            <div className='flex-1 overflow-auto'>
                <div className='py-2 px-3'>
                    {conversation.messages?.map((message, index) => (
                        <Fragment key={index}>
                            {message.type === 'text' ? (
                                message.sender.id === id ? (
                                    <SenderMessage
                                        message={message.message}
                                        timestamp={message.timestamp}
                                    />
                                ) : (
                                    <ReceiverMessage
                                        name={getName(message.sender)}
                                        message={message.message}
                                        timestamp={message.timestamp}
                                    />
                                )
                            ) : null}
                        </Fragment>
                    ))}
                </div>
            </div>
            <form
                ref={formRef}
                className='bg-grey-lighter px-4 py-4 flex items-center'
                onSubmit={submit}
            >
                <input
                    ref={fileRef}
                    type='file'
                    className='hidden'
                    onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            upload(e.target.files[0]);
                        }
                    }}
                />
                <IconButton
                    onClick={(e) => {
                        e.preventDefault();
                        if (!processing) {
                            fileRef.current?.click();
                        }
                    }}
                    disabled={processing}
                >
                    <i className='fas fa-paperclip fa-2x'></i>
                </IconButton>
                <div className='flex-1 mx-4'>
                    <Input
                        type='text'
                        label='Message'
                        {...register('message')}
                        disabled={processing}
                    />
                </div>
                <IconButton type='submit' disabled={processing}>
                    <i className='fas fa-paper-plane fa-2x'></i>
                </IconButton>
            </form>
        </div>
    );
};

export default Chat;
