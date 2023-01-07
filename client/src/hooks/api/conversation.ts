import { convertModePrefix } from '@/helpers';
import { Modes, Nullable, Response } from '@/types/misc';
import { useService } from '@/hooks';
import { HttpService } from '@/services/http';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Conversation } from '@/types/models/converstation';
import { Send } from '@/types/requests/conversation/send';

export function useConversationList(mode: Modes, keyword: Nullable<string>) {
    const prefix = convertModePrefix(mode);
    const key = `${mode}.conversations`;
    const http = useService(HttpService);
    const url = `/v1/${prefix}/conversations`;

    const { data } = useQuery(keyword ? [key, keyword] : key, async () => {
        const { data } = await http.get<Response<Conversation[]>>(url, {
            params: { keyword },
        });

        return data.data;
    });

    return data ?? [];
}

export function useConversation(mode: Modes, id: string) {
    const prefix = convertModePrefix(mode);
    const key = `${mode}.conversations`;
    const http = useService(HttpService);
    const url = `/v1/${prefix}/conversations/${id}`;

    const { data } = useQuery(
        [key, id],
        async () => {
            const { data } = await http.get<Response<Conversation>>(url);

            return data.data;
        },
        { refetchInterval: 2000, refetchIntervalInBackground: true }
    );

    return data;
}

export function useConversationSend(mode: Modes) {
    const prefix = convertModePrefix(mode);
    const key = `${mode}.conversations`;
    const http = useService(HttpService);
    const url = `/v1/${prefix}/conversations/send`;
    const client = useQueryClient();

    return useMutation(
        async (payload: Send) => {
            const { data } = await http.post<Response<Conversation>>(
                url,
                payload
            );

            return data.data;
        },
        {
            onSuccess: (conversation) => {
                client.invalidateQueries(key);
                client.invalidateQueries([key, conversation.id]);
            },
        }
    );
}
