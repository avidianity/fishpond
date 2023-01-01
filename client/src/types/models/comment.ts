import { Nullable, SenderType } from '@/types/misc';

export interface Comment<Sender = any, Host = any> {
    id: string;
    sender_type: SenderType;
    sender: Nullable<Sender>;
    host: Nullable<Host>;
    message: string;
    created_at: string;
    updated_at: string;
}
