import { Modes, Token, User } from '@/types/misc';

export type AuthResponse<T extends User = any> = {
    data: T;
    type: Modes;
    access: Token;
};
