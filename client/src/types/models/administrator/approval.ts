import { Pond } from '@/types/models/pond';

export interface Approval {
    id: string;
    approved: boolean;
    approvable: Pond;
    created_at: string;
}
