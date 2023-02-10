import Chat from '@/components/Conversations/Chat';
import Container from '@/components/Conversations/Container';
import { MessageType } from '@/constants';
import { convertPrefixToMode } from '@/helpers';
import { useService } from '@/hooks';
import { useConversation, useConversationSend } from '@/hooks/api/conversation';
import { StorageService } from '@/services/storage';
import { Modes, Valid } from '@/types/misc';
import { Conversation as ConversationModel } from '@/types/models/converstation';
import { Pond } from '@/types/models/pond';
import { useMatch, useNavigate } from '@tanstack/react-location';
import React, { FC } from 'react';

type Props = {
    mode: Modes;
};

const Conversation: FC<Props> = ({ mode }) => {
    const mutation = useConversationSend(mode);
    const storage = useService(StorageService);
    const id = storage.get('id');
    const navigate = useNavigate();
    const match = useMatch();
    const conversation = useConversation(mode, match.params.id);

    const getReceiver = (conversation: ConversationModel) => {
        if (conversation.receiver.id === id) {
            return conversation.sender;
        }

        return conversation.receiver;
    };

    const upload = async (file: File, pond: Pond) => {
        if (conversation) {
            const receiver = getReceiver(conversation);
            await mutation.mutateAsync({
                receiver_type: convertPrefixToMode(receiver.type),
                receiver_id: receiver.id,
                message_type: MessageType.FILE,
                message_file: file,
                pond_id: pond.id,
            });
        }
    };

    const send = async (message: string, pond: Pond) => {
        if (conversation) {
            const receiver = getReceiver(conversation);
            await mutation.mutateAsync({
                receiver_type: convertPrefixToMode(receiver.type),
                receiver_id: receiver.id,
                message_type: MessageType.TEXT,
                message_text: message,
                pond_id: pond.id,
            });
        }
    };

    if (!conversation) {
        return null;
    }

    return (
        <Container>
            <Chat
                mode={mode}
                onClose={() =>
                    navigate({ to: `/${mode}/dashboard/conversations` })
                }
                onUpload={async (file) =>
                    await upload(file, conversation.pond as Valid)
                }
                onMessage={async (message) =>
                    await send(message, conversation.pond as Valid)
                }
            />
        </Container>
    );
};

export default Conversation;
