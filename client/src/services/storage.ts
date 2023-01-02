import { State } from '@avidian/state';

export class StorageService extends State {
    protected static instance: State;

    constructor() {
        const storage = localStorage;

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
