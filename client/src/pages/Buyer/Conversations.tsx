import React, { FC } from 'react';
import BaseConversations from '@/components/Conversations';
import { Modes } from '@/constants';

const Conversations: FC = () => {
    return <BaseConversations mode={Modes.BUYER} />;
};

export default Conversations;
