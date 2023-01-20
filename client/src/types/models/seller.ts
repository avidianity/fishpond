import { Image, Nullable } from '../misc';
import { Pond } from '@/types/models/pond';

export interface Seller {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: Nullable<string>;
    address: Nullable<string>;
    image: Image;
    ponds?: Nullable<Pond[]>;
    created_at: string;
    updated_at: string;
}
