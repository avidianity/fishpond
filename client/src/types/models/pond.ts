import { Image, Nullable, PondStatus } from '@/types/misc';
import { Seller } from '@/types/models/seller';
import { Sender } from '@/types/models/sender';
import { Comment } from '@/types/models/comment';
import { Rating } from '@/types/models/rating';

export interface Pond {
    id: string;
    name: string;
    status: PondStatus;
    image: Image;
    description: string;
    images?: string[];
    latitude?: number;
    longitude?: number;
    class: Nullable<string>;
    price: Nullable<string>;
    location_url: Nullable<string>;
    square_meters: Nullable<string>;
    owner: Nullable<Seller>;
    comments: Nullable<Comment<Sender, Pond>[]>;
    ratings: Nullable<Rating[]>;
    created_at: string;
    updated_at: string;
}
