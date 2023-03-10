/* eslint-disable @typescript-eslint/ban-types */
import swal from 'sweetalert';
import { Rating } from '@/types/models/rating';
import { StorageService } from '@/services/storage';
import { Image, Modes, PondStatus } from '@/types/misc';

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
    const storage = StorageService.getInstance();

    const id = storage.get<string>('id');
    const type = storage.get<Modes>('type');

    if (type === 'buyer') {
        const selfRating = ratings.find((rating) => rating.client_id === id);

        if (selfRating) {
            return selfRating.value;
        }
    }

    if (ratings.length === 0) {
        return 0;
    }

    const stars = ratings.map((rating) => rating.value);

    return stars.reduce((a, b) => a + b, 0) / stars.length;
}

export function call<T extends Function>(callback: T) {
    return callback();
}

export function convertModePrefix(mode: Modes) {
    switch (mode) {
        case 'administrator':
            return mode;
        case 'buyer':
            return 'client';
        case 'seller':
            return 'owner';
    }
}

export function convertPrefixToMode(
    prefix: 'administrator' | 'client' | 'owner'
) {
    switch (prefix) {
        case 'administrator':
            return prefix;
        case 'client':
            return 'buyer';
        case 'owner':
            return 'seller';
    }
}

export function getStatusColor(status: PondStatus) {
    switch (status) {
        case 'For Sale':
            return 'green';
        case 'For Rent':
            return 'amber';
        case 'Sold':
            return 'red';
    }
}

export function parseImageUrl(image?: Image | string) {
    if (image) {
        if (typeof image === 'string') {
            return image;
        }

        if (image.url) {
            return image.url;
        }
    }

    return 'https://via.placeholder.com/600';
}
