import React, { FC } from 'react';
import BaseConversation from '@/components/Conversations/Conversation';
import { Modes } from '@/constants';

const Conversation: FC = () => {
    return <BaseConversation mode={Modes.ADMINISTRATOR} />;
};

export default Conversation;