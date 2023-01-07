import { ChatUser, MessageType, Nullable, Valid } from '@/types/misc';
import { Conversation } from '@/types/models/converstation';

export interface Message {
    conversation: Nullable<Conversation>;
    receiver: ChatUser;
    sender: ChatUser;
    metadata: Valid;
    type: MessageType;
    message: string;
    timestamp: string;
}
