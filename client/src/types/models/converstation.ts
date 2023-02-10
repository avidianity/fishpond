import { ChatUser, Nullable } from '@/types/misc';
import { Message } from '@/types/models/message';
import { Pond } from '@/types/models/pond';

export interface Conversation {
    id: string;
    receiver: ChatUser;
    sender: ChatUser;
    messages: Nullable<Message[]>;
    pond: Nullable<Pond>;
}
