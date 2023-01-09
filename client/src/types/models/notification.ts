import { Valid } from '@/types/misc';

export interface Notification {
    id: string;
    type: string;
    data: Valid;
    read_at: string;
    created_at: string;
}
