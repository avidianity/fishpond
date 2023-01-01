import { useService } from '@/hooks';
import { BuyerService } from '@/services/administrator/buyer';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const listKey = ['administrator.buyers'];

export function useBuyerList() {
    const buyerService = useService(BuyerService);
    const { data } = useQuery(listKey, () => buyerService.all());

    return data ?? [];
}

export function useBuyerDestroy() {
    const buyerService = useService(BuyerService);
    const client = useQueryClient();

    const mutation = async (id: string) => {
        await buyerService.destroy(id);
    };

    return useMutation(mutation, {
        onSuccess: () => {
            client.invalidateQueries(listKey);
            toast.success('Buyer deleted successfully!');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Unable to delete Buyer. Please try again later.');
        },
    });
}
