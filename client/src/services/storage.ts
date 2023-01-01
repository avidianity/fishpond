import { State } from '@avidian/state';
import { CookieStorage } from 'cookie-storage';
import dayjs from 'dayjs';

export class StorageService extends State {
    protected static instance: State;

    constructor() {
        const storage = new CookieStorage({
            expires: dayjs().add(1, 'month').toDate(),
        });

        super({
            storage,
            key: 'fishpond',
        });
    }

    public static getInstance(): StorageService {
        if (!StorageService.instance) {
            StorageService.instance = new StorageService();
        }

        return StorageService.instance;
    }
}
