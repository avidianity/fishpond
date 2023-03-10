import { HttpService } from '@/services/http';
import type { Modes, Response } from '@/types/misc';
import { Sender } from '@/types/models/sender';
import { Comment } from '@/types/models/comment';
import type { Pond } from '@/types/models/pond';
import { convertModePrefix } from '@/helpers';

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
        const prefix = convertModePrefix(mode);

        const { data } = await this.http.post<Response<Comment<Sender, Pond>>>(
            `/v1/${prefix}/ponds/comment`,
            { message, pond_id: id }
        );

        return data;
    }

    public async deleteComment(mode: Modes, id: string) {
        const prefix = convertModePrefix(mode);

        await this.http.delete(`/v1/${prefix}/ponds/comment/${id}`);
    }
}
