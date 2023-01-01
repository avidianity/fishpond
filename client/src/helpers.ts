import swal from 'sweetalert';
import { Rating } from '@/types/models/rating';

export function createTokenHeader(token: string) {
    return {
        Authorization: `Bearer ${token}`,
    };
}

export class Asker {
    static async notice(message: string, title?: string) {
        return toBool(
            await swal({
                title,
                text: message,
                buttons: ['Cancel', 'Confirm'],
                icon: 'warning',
            })
        );
    }

    static async danger(message: string, title?: string) {
        return toBool(
            await swal({
                title,
                text: message,
                buttons: ['Cancel', 'Confirm'],
                dangerMode: true,
                icon: 'warning',
            })
        );
    }

    static async save(message: string, title?: string) {
        return toBool(
            await swal({
                title,
                text: message,
                buttons: ['Cancel', 'Save'],
                icon: 'info',
            })
        );
    }

    static async okay(message: string, title?: string) {
        return toBool(await swal({ title, text: message, icon: 'info' }));
    }

    static async error(message: string, title?: string) {
        return toBool(await swal({ title, text: message, icon: 'error' }));
    }
}

export function toBool(data: unknown) {
    return data ? true : false;
}

export function calculateRatings(ratings: Rating[]) {
    if (ratings.length === 0) {
        return 0;
    }

    const stars = ratings.map((rating) => rating.value);

    const value = stars.reduce((a, b) => a + b, 0) / stars.length;

    return Number.isInteger(value) ? value : Number(value.toFixed(1));
}

export function call<T extends () => void>(callback: T) {
    return callback();
}
