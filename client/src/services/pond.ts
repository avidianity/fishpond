import { HttpService } from '@/services/http';
import type { Modes, Response } from '@/types/misc';
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

    public async comment(mode: Modes, id: string, message: string) {
        const { data } = await this.http.post<Response<Comment<Sender, Pond>>>(
            `/v1/${mode}/ponds/comment`,
            { message, pond_id: id }
        );

        return data;
    }
}
