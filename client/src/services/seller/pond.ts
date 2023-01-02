import { HttpService } from '@/services/http';
import type { Response } from '@/types/misc';
import { Sender } from '@/types/models/sender';
import { Comment } from '@/types/models/comment';
import type { Pond } from '@/types/models/pond';
import { PondPayload } from '@/types/payloads/pond';

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
            '/v1/owner/ponds'
        );

        return data.data;
    }

    public async show(id: string) {
        const { data } = await this.http.get<Response<Pond>>(
            `/v1/owner/ponds/${id}`
        );

        return data.data;
    }

    public async store(payload: PondPayload) {
        const { data } = await this.http.post<Response<Pond>>(
            '/v1/owner/ponds',
            payload
        );

        return data;
    }

    public async update(id: string, payload: PondPayload) {
        const { data } = await this.http.put<Response<Pond>>(
            `/v1/owner/ponds/${id}`,
            payload
        );

        return data;
    }

    public async destroy(id: string) {
        await this.http.delete(`/v1/owner/ponds/${id}`);
    }

    public async comment(id: string, message: string) {
        const { data } = await this.http.post<Response<Comment<Sender, Pond>>>(
            '/v1/owner/ponds/comment',
            { message, pond_id: id }
        );

        return data;
    }
}
