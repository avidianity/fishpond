import { HttpService } from '@/services/http';
import type { Response } from '@/types/misc';
import type { File as FileModel } from '@/types/models/file';

export class FileService {
    protected static instance: FileService;
    protected http: HttpService;

    constructor() {
        this.http = HttpService.getInstance();
    }

    public static getInstance(): FileService {
        if (!FileService.instance) {
            FileService.instance = new FileService();
        }

        return FileService.instance;
    }

    public async upload(file: File) {
        const payload = new FormData();

        payload.set('file', file);

        const { data } = await this.http.post<Response<FileModel>>(
            '/v1/owner/files',
            payload
        );

        return data;
    }
}
