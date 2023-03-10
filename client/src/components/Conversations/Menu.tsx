import { parseImageUrl } from '@/helpers';
import { useService } from '@/hooks';
import { StorageService } from '@/services/storage';
import { ChatUser, Nullable } from '@/types/misc';
import { Conversation } from '@/types/models/converstation';
import { Message } from '@/types/models/message';
import { Input } from '@material-tailwind/react';
import dayjs from 'dayjs';
import React, { FC } from 'react';

type Props = {
    conversations: Conversation[];
    onChange: (conversation: Conversation) => void;
    onSearch: (keyword: string) => void;
};

const Menu: FC<Props> = ({ conversations, onChange, onSearch }) => {
    const storage = useService(StorageService);
    const id = storage.get('id');
    const user = storage.get<ChatUser>('user');

    const getReceiver = (conversation: Conversation) => {
        if (conversation.receiver.id === id) {
            return conversation.sender;
        }

        return conversation.receiver;
    };

    const getName = (conversation: Conversation) => {
        const receiver = getReceiver(conversation);

        if (receiver.type === 'administrator') {
            return receiver.email;
        }

        return `${receiver.first_name} ${receiver.last_name}`;
    };

    const getLastMessage = (messages: Nullable<Message[]>) => {
        const last = messages?.last();

        if (!last) {
            return null;
        }

        if (last.type === 'text') {
            return last.message;
        }

        const fileType = last.metadata.type.match(/image\/(.{0,})/g)
            ? 'photo'
            : 'file';

        if (last.sender.id === id) {
            return `You sent a ${fileType}.`;
        }

        return `${last.sender.first_name} sent a ${fileType}.`;
    };

    return (
        <div className='w-full border flex flex-col'>
            <div className='py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center'>
                <div>
                    <img
                        className='w-10 h-10 rounded-full'
                        src={parseImageUrl(user?.image)}
                    />
                </div>
            </div>

            <div className='py-2 px-2 bg-grey-lightest'>
                <Input
                    type='search'
                    label='Search'
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>

            <div className='flex-1 overflow-auto'>
                {conversations
                    .filter(
                        (conversation) =>
                            conversation.messages &&
                            conversation.messages.length > 0
                    )
                    .map((conversation, index) => (
                        <div
                            className='bg-white px-3 flex items-center hover:bg-gray-100 cursor-pointer'
                            key={index}
                            onClick={(e) => {
                                e.preventDefault();
                                onChange(conversation);
                            }}
                        >
                            <div>
                                <img
                                    className='h-12 w-12 rounded-full'
                                    src={parseImageUrl(
                                        getReceiver(conversation).image
                                    )}
                                />
                            </div>
                            <div className='ml-4 flex-1 border-b border-grey-lighter py-4'>
                                <div className='flex items-bottom justify-between'>
                                    <p className='text-grey-darkest'>
                                        {getName(conversation)} -{' '}
                                        {conversation.pond?.name}
                                    </p>
                                    <p className='text-xs text-grey-darkest'>
                                        {dayjs(
                                            conversation.messages?.last()
                                                ?.timestamp
                                        ).format('hh:mm A')}
                                    </p>
                                </div>
                                <p className='text-grey-dark mt-1 text-sm'>
                                    {getLastMessage(conversation.messages)}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Menu;
