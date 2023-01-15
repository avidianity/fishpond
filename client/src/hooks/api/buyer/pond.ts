import { useService } from '@/hooks';
import { PondService } from '@/services/buyer/pond';
import { Nullable, PondStatus } from '@/types/misc';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const listKey = ['buyer.ponds'];

export function usePondList(keyword?: Nullable<string>, status?: PondStatus) {
    const pondService = useService(PondService);
    const { data } = useQuery(
        keyword ? [...listKey, keyword, status] : [...listKey, status],
        () => pondService.all({ keyword, status })
    );

    return data ?? [];
}

export function usePond(id: string) {
    const pondService = useService(PondService);
    const { data } = useQuery([...listKey, id], () => pondService.show(id));

    return data;
}

export function usePondRate(id: string) {
    const pondService = useService(PondService);
    const client = useQueryClient();

    const mutation = async (rating: number) => {
        await pondService.rate(id, rating);
    };

    return useMutation(mutation, {
        onSuccess: () => {
            client.invalidateQueries(listKey);
            client.invalidateQueries([...listKey, id]);
        },
        onError: (error) => {
            console.error(error);
            toast.error('Unable to rate pond. Please try again later.');
        },
    });
}
