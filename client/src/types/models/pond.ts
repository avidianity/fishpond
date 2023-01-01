import { Image, Nullable } from '@/types/misc';
import { Seller } from '@/types/models/administrator/seller';
import { Sender } from '@/types/models/sender';
import { Comment } from '@/types/models/comment';
import { Rating } from '@/types/models/rating';

export interface Pond {
    id: string;
    name: string;
    status: string;
    image: Image;
    description: string;
    owner: Nullable<Seller>;
    comments: Nullable<Comment<Sender, Pond>[]>;
    ratings: Nullable<Rating[]>;
}
