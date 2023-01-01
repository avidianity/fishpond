import swal from 'sweetalert';

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
