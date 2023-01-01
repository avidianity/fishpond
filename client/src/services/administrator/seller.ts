import { HttpService } from '@/services/http';
import type { Response } from '@/types/misc';
import type { Seller } from '@/types/models/administrator/seller';

export class SellerService {
    protected static instance: SellerService;
    protected http: HttpService;

    constructor() {
        this.http = HttpService.getInstance();
    }

    public static getInstance(): SellerService {
        if (!SellerService.instance) {
            SellerService.instance = new SellerService();
        }

        return SellerService.instance;
    }

    public async all() {
        const { data } = await this.http.get<Response<Seller[]>>(
            '/v1/administrator/owners'
        );

        return data.data;
    }

    public async destroy(id: string) {
        await this.http.delete(`/v1/administrator/owners/${id}`);
    }
}
