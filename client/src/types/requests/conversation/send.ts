import { MessageType, Modes } from '@/types/misc';

export type Send = {
    receiver_type: Modes;
    receiver_id: string;
    message_type: MessageType;
    message_text?: string;
    message_file?: File;
};
