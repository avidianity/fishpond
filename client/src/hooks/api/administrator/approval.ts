import { useService } from '@/hooks';
import { ApprovalService } from '@/services/administrator/approval';
import { isAxiosError } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const listKey = 'administrator.approvals';

export function useApprovalList() {
    const approvalService = useService(ApprovalService);
    const { data } = useQuery(listKey, () => approvalService.all());

    return data ?? [];
}

export function useApprovalApprove() {
    const approvalService = useService(ApprovalService);
    const client = useQueryClient();

    const mutation = async (id: string) => {
        await approvalService.approve(id);
    };

    return useMutation(mutation, {
        onSuccess: () => {
            toast.success('Request has been approved successfully!');
            client.invalidateQueries(listKey);
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                console.error(error);
                toast.error(
                    'Unable to approve request. Please try again later.'
                );
            }
        },
    });
}

export function useApprovalReject() {
    const approvalService = useService(ApprovalService);
    const client = useQueryClient();

    const mutation = async (id: string) => {
        await approvalService.reject(id);
    };

    return useMutation(mutation, {
        onSuccess: () => {
            toast.success('Request has been rejected successfully!');
            client.invalidateQueries(listKey);
        },
        onError: (error) => {
            if (isAxiosError(error)) {
                toast.error(error.response?.data?.message);
            } else {
                console.error(error);
                toast.error(
                    'Unable to reject request. Please try again later.'
                );
            }
        },
    });
}
