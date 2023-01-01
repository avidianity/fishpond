import { useService } from '@/hooks';
import { SellerService } from '@/services/administrator/seller';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const listKey = ['administrator.sellers'];

export function useSellerList() {
    const sellerService = useService(SellerService);
    const { data } = useQuery(listKey, () => sellerService.all());

    return data ?? [];
}

export function useSellerDestroy() {
    const sellerService = useService(SellerService);
    const client = useQueryClient();

    const mutation = async (id: string) => {
        await sellerService.destroy(id);
    };

    return useMutation(mutation, {
        onSuccess: () => {
            client.invalidateQueries(listKey);
            toast.success('Seller deleted successfully!');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Unable to delete Seller. Please try again later.');
        },
    });
}
