import { HttpService } from '@/services/http';
import type { Params, Response } from '@/types/misc';
import { Sender } from '@/types/models/sender';
import { Comment } from '@/types/models/comment';
import type { Pond } from '@/types/models/pond';

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

    public async all(params?: Params) {
        const { data } = await this.http.get<Response<Pond[]>>(
            '/v1/administrator/ponds',
            { params }
        );

        return data.data;
    }

    public async show(id: string) {
        const { data } = await this.http.get<Response<Pond>>(
            `/v1/administrator/ponds/${id}`
        );

        return data.data;
    }

    public async destroy(id: string) {
        await this.http.delete(`/v1/administrator/ponds/${id}`);
    }

    public async comment(id: string, message: string) {
        const { data } = await this.http.post<Response<Comment<Sender, Pond>>>(
            '/v1/administrator/ponds/comment',
            { message, pond_id: id }
        );

        return data;
    }
}
