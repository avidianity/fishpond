import { Pond } from '@/types/models/pond';

export type PondPayload = Partial<
    Omit<Pond, 'comments' | 'ratings' | 'image'>
> & { image_url: string };
