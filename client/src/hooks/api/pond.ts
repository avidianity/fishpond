import { PondService } from '@/services/pond';
import { Modes } from '@/types/misc';
import { useMutation, useQueryClient } from 'react-query';
import { useService } from '@/hooks';
import { toast } from 'react-toastify';

export function usePondComment(mode: Modes, id: string) {
    const pondService = useService(PondService);
    const client = useQueryClient();
    const listKey = [`${mode}.ponds`];

    const mutation = async (message: string) => {
        await pondService.comment(mode, id, message);
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

export function usePondCommentDelete(mode: Modes) {
    const pondService = useService(PondService);
    const client = useQueryClient();
    const listKey = [`${mode}.ponds`];

    const mutation = async (id: string) => {
        await pondService.deleteComment(mode, id);
    };

    return useMutation(mutation, {
        onSuccess: () => {
            client.invalidateQueries([...listKey]);
        },
        onError: (error) => {
            console.error(error);
            toast.error('Unable to delete comment. Please try again later.');
        },
    });
}
