import { useService } from '@/hooks';
import { PondService } from '@/services/administrator/pond';
import { useQuery } from 'react-query';

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
