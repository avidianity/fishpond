import { HttpService } from '@/services/http';
import type { Response } from '@/types/misc';
import { Sender } from '@/types/models/sender';
import { Comment } from '@/types/models/comment';
import type { Pond } from '@/types/models/pond';
import { Rating } from '@/types/models/rating';

export class PondService {
    protected static instance: PondService;
    protected http: HttpService;

    constructor() {
        this.http = HttpService.getInstance();
    }

    public static getInstance(): PondService {
        if (!PondService.instance) {
            PondService.instance = new PondService();
        }

        return PondService.instance;
    }

    public async all() {
        const { data } = await this.http.get<Response<Pond[]>>(
            '/v1/client/ponds'
        );

        return data.data;
    }

    public async show(id: string) {
        const { data } = await this.http.get<Response<Pond>>(
            `/v1/client/ponds/${id}`
        );

        return data.data;
    }

    public async comment(id: string, message: string) {
        const { data } = await this.http.post<Response<Comment<Sender, Pond>>>(
            '/v1/client/ponds/comment',
            { message, pond_id: id }
        );

        return data;
    }

    public async rate(id: string, rating: number) {
        const { data } = await this.http.post<Response<Rating>>(
            '/v1/client/ponds/rate',
            {
                pond_id: id,
                value: rating,
            }
        );

        return data;
    }
}
