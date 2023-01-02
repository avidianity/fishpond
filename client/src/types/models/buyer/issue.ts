import { Nullable } from '@/types/misc';
import { Buyer } from '@/types/models/administrator/buyer';
import { Pond } from '@/types/models/pond';

export interface Issue {
    id: string;
    message: string;
    pond: Nullable<Pond>;
    client: Nullable<Buyer>;
    created_at: string;
    updated_at: string;
}
