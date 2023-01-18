import { HttpService } from '@/services/http';
import type { Response } from '@/types/misc';
import type { Approval } from '@/types/models/administrator/approval';

export class ApprovalService {
    protected static instance: ApprovalService;
    protected http: HttpService;

    constructor() {
        this.http = HttpService.getInstance();
    }

    public static getInstance(): ApprovalService {
        if (!ApprovalService.instance) {
            ApprovalService.instance = new ApprovalService();
        }

        return ApprovalService.instance;
    }

    public async all() {
        const { data } = await this.http.get<Response<Approval[]>>(
            '/v1/administrator/approvals'
        );

        return data.data;
    }

    public async one(id: string) {
        const { data } = await this.http.get<Response<Approval>>(
            `/v1/administrator/approvals/${id}`
        );

        return data.data;
    }

    public async approve(id: string) {
        await this.http.put(`/v1/administrator/approvals/${id}`, {
            approved: true,
        });
    }

    public async reject(id: string) {
        await this.http.delete(`/v1/administrator/approvals/${id}`);
    }
}
