import { Image } from '@/types/misc';

export interface Sender {
    id: string;
    first_name?: string;
    last_name?: string;
    email: string;
    image?: Image;
}
