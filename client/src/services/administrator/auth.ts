import type { AuthResponse } from '@/types/responses/auth';
import { HttpService } from '@/services/http';
import { StorageService } from '@/services/storage';
import { isAxiosError } from 'axios';

export class AuthService {
    protected static instance: AuthService;
    protected http: HttpService;
    protected storage: StorageService;

    constructor() {
        this.http = HttpService.getInstance();
        this.storage = StorageService.getInstance();
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }

        return AuthService.instance;
    }

    public async login(email: string, password: string) {
        const { data } = await this.http.post<AuthResponse>(
            '/v1/administrator/auth/login',
            { email, password }
        );

        return data;
    }

    public async logout() {
        try {
            await this.http.get('/v1/administrator/auth/logout');
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.response && error.response.status !== 401) {
                    console.error(error.response.data);
                }
            } else {
                console.error(error);
            }
        } finally {
            this.storage.clear();
        }
    }
}
