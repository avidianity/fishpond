import { useService } from '@/hooks';
import { PondService } from '@/services/administrator/pond';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const listKey = ['administrator.ponds'];

export function usePondList() {
    const pondService = useService(PondService);
    const { data } = useQuery(listKey, () => pondService.all());

    return data ?? [];
}

export function usePond(id: string) {
    const pondService = useService(PondService);
    const { data } = useQuery([...listKey, id], () => pondService.show(id));

    return data;
}

export function usePondComment(id: string) {
    const pondService = useService(PondService);
    const client = useQueryClient();

    const mutation = async (message: string) => {
        await pondService.comment(id, message);
    };

    return useMutation(mutation, {
        onSuccess: () => {
            client.invalidateQueries([...listKey, id]);
        },
        onError: (error) => {
            console.error(error);
            toast.error('Unable to comment. Please try again later.');
        },
    });
}
