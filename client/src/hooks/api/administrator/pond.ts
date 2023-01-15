import { useService } from '@/hooks';
import { PondService } from '@/services/administrator/pond';
import { Nullable, PondStatus } from '@/types/misc';
import { isAxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const listKey = ['administrator.ponds'];

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

export function usePondDelete() {
    const client = useQueryClient();
    const pondService = useService(PondService);

    const mutation = async (id: string) => {
        return await pondService.destroy(id);
    };

    return useMutation(mutation, {
        onSuccess: () => {
            client.invalidateQueries(listKey);
            toast.success('Pond deleted successfully!');
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                console.error(error);
                toast.error('Unable to delete pond. Please try again later.');
            }
        },
    });
}
