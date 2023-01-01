import { Token } from '@/types/misc';
import { Administrator } from '@/types/models/administrator/administrator';

export type AuthResponse = {
    data: Administrator;
    access: Token;
};
