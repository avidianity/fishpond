/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { Axios, RawAxiosRequestConfig, AxiosResponse } from 'axios';
import { StorageService } from '@/services/storage';
import { SERVER_URL } from '@/config/app';

export class HttpService {
    protected client: Axios;
    protected static instance?: HttpService;

    constructor() {
        this.client = axios.create({
            baseURL: SERVER_URL,
            headers: {
                Accept: 'application/json',
            },
        });

        this.client.interceptors.request.use((request) => {
            const storage = StorageService.getInstance();
            const token = storage.get<string>('token');

            if (token) {
                request.headers.set('Authorization', `Bearer ${token}`);
            }

            return request;
        });
    }

    public static getInstance(): HttpService {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService();
        }

        return HttpService.instance;
    }

    public get<T = any, R = AxiosResponse<T>, D = any>(
        url: string,
        config?: RawAxiosRequestConfig<D>
    ) {
        return this.client.get<T, R, D>(url, config);
    }

    public delete<T = any, R = AxiosResponse<T>, D = any>(
        url: string,
        config?: RawAxiosRequestConfig<D>
    ) {
        return this.client.delete<T, R, D>(url, config);
    }

    public post<T = any, R = AxiosResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: RawAxiosRequestConfig<D>
    ) {
        return this.client.post<T, R, D>(url, data, config);
    }

    public put<T = any, R = AxiosResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: RawAxiosRequestConfig<D>
    ) {
        return this.client.put<T, R, D>(url, data, config);
    }

    public patch<T = any, R = AxiosResponse<T>, D = any>(
        url: string,
        data?: D,
        config?: RawAxiosRequestConfig<D>
    ) {
        return this.client.patch<T, R, D>(url, data, config);
    }

    public head<T = any, R = AxiosResponse<T>, D = any>(
        url: string,
        config?: RawAxiosRequestConfig<D>
    ) {
        return this.client.head<T, R, D>(url, config);
    }
}
