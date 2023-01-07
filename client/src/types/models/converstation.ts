import { ChatUser, Nullable } from '@/types/misc';
import { Message } from '@/types/models/message';

export interface Conversation {
    id: string;
    receiver: ChatUser;
    sender: ChatUser;
    messages: Nullable<Message[]>;
}
