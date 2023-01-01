import { HttpService } from '@/services/http';
import type { Response } from '@/types/misc';
import type { Buyer } from '@/types/models/administrator/buyer';

export class BuyerService {
    protected static instance: BuyerService;
    protected http: HttpService;

    constructor() {
        this.http = HttpService.getInstance();
    }

    public static getInstance(): BuyerService {
        if (!BuyerService.instance) {
            BuyerService.instance = new BuyerService();
        }

        return BuyerService.instance;
    }

    public async all() {
        const { data } = await this.http.get<Response<Buyer[]>>(
            '/v1/administrator/clients'
        );

        return data.data;
    }

    public async destroy(id: string) {
        await this.http.delete(`/v1/administrator/clients/${id}`);
    }
}
