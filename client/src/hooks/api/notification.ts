import { Modes, Response } from '@/types/misc';
import { useService } from '@/hooks';
import { HttpService } from '@/services/http';
import { convertModePrefix } from '@/helpers';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Notification } from '@/types/models/notification';
import { MarkAsRead } from '@/types/requests/notification/mark-as-read';
import { isAxiosError } from 'axios';
import { toast } from 'react-toastify';

export function useNotificationList(mode: Modes) {
    const http = useService(HttpService);
    const prefix = convertModePrefix(mode);
    const listKey = `${mode}.notifications`;

    const { data } = useQuery(listKey, async () => {
        const { data } = await http.get<Response<Notification[]>>(
            `/v1/${prefix}/notifications`
        );

        return data.data;
    });

    return data ?? [];
}

export function useNotificationReader(mode: Modes) {
    const http = useService(HttpService);
    const prefix = convertModePrefix(mode);
    const listKey = `${mode}.notifications`;
    const client = useQueryClient();

    return useMutation(
        async (payload: MarkAsRead) => {
            const { data } = await http.put<Response<Notification>>(
                `/v1/${prefix}/notifications/${payload.notification_id}`,
                {
                    mark_as_read: payload.mark_as_read,
                }
            );

            return data.data;
        },
        {
            onSuccess: () => {
                client.invalidateQueries(listKey);
            },
            onError: (error) => {
                if (isAxiosError(error)) {
                    toast.error(error.response?.data?.message);
                } else {
                    console.error(error);
                    toast.error(
                        'Unable to update notification. Please try again later.'
                    );
                }
            },
        }
    );
}
