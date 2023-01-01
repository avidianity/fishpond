import { HttpService } from '@/services/http';
import type { Response } from '@/types/misc';
import type { Issue } from '@/types/models/administrator/issue';

export class IssueService {
    protected static instance: IssueService;
    protected http: HttpService;

    constructor() {
        this.http = HttpService.getInstance();
    }

    public static getInstance(): IssueService {
        if (!IssueService.instance) {
            IssueService.instance = new IssueService();
        }

        return IssueService.instance;
    }

    public async all() {
        const { data } = await this.http.get<Response<Issue[]>>(
            '/v1/administrator/issues'
        );

        return data.data;
    }

    public async destroy(id: string) {
        await this.http.delete(`/v1/administrator/issues/${id}`);
    }
}
