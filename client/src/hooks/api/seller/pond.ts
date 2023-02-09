import { useService } from '@/hooks';
import { PondService } from '@/services/seller/pond';
import { FormMode, Nullable, PondClass, PondStatus } from '@/types/misc';
import { PondPayload } from '@/types/payloads/pond';
import { useMatch } from '@tanstack/react-location';
import { isAxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const listKey = ['seller.ponds'];

export function usePondList(
    keyword?: Nullable<string>,
    status?: PondStatus,
    pondClass?: PondClass
) {
    const pondService = useService(PondService);
    const { data } = useQuery(
        keyword
            ? [...listKey, keyword, status, pondClass]
            : [...listKey, status, pondClass],
        () => pondService.all({ keyword, status, class: pondClass })
    );

    return data ?? [];
}

export function usePond(id: string) {
    const pondService = useService(PondService);
    const { data } = useQuery([...listKey, id], () => pondService.show(id));

    return data;
}

export function usePondMutation(mode: FormMode) {
    const match = useMatch();
    const client = useQueryClient();
    const pondService = useService(PondService);

    const mutation = async (payload: PondPayload) => {
        if (mode === 'add') {
            return await pondService.store(payload);
        }

        return await pondService.update(match.params.id, payload);
    };

    return useMutation(mutation, {
        onSuccess: () => {
            client.invalidateQueries(listKey);

            if (mode === 'edit') {
                client.invalidateQueries([...listKey, match.params.id]);

                toast.success('Pond saved successfully!');
            } else {
                toast.success(
                    'Pond saved successfully! Please wait for it to be approved.'
                );
            }
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                console.error(error);
                toast.error('Unable to save pond. Please try again later.');
            }
        },
    });
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
