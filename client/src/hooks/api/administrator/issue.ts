import { useService } from '@/hooks';
import { IssueService } from '@/services/administrator/issue';
import { useQuery } from 'react-query';

const listKey = ['administrator.issues'];

export function useIssueList() {
    const issueService = useService(IssueService);
    const { data } = useQuery(listKey, () => issueService.all());

    return data ?? [];
}
