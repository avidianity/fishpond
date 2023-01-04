import { useService } from '@/hooks';
import { PondService } from '@/services/administrator/pond';
import { Nullable } from '@/types/misc';
import { useQuery } from 'react-query';

const listKey = ['administrator.ponds'];

export function usePondList(keyword?: Nullable<string>) {
    const pondService = useService(PondService);
    const { data } = useQuery(keyword ? [...listKey, keyword] : listKey, () =>
        pondService.all({ keyword })
    );

    return data ?? [];
}

export function usePond(id: string) {
    const pondService = useService(PondService);
    const { data } = useQuery([...listKey, id], () => pondService.show(id));

    return data;
}
