import { Image, Nullable } from '@/types/misc';

export interface Seller {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: Nullable<string>;
    address: Nullable<string>;
    image: Image;
    created_at: string;
    updated_at: string;
}
