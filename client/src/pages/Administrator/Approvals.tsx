import React, { FC, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { TableColumns, Valid } from '@/types/misc';
import dayjs from 'dayjs';
import { Link } from '@tanstack/react-location';
import { Button } from '@material-tailwind/react';
import { Asker } from '@/helpers';
import {
    useApprovalApprove,
    useApprovalList,
    useApprovalReject,
} from '@/hooks/api/administrator/approval';
import { Approval } from '@/types/models/administrator/approval';

const Approvals: FC = () => {
    const issues = useApprovalList();
    const approveMutation = useApprovalApprove();
    const rejectMutation = useApprovalReject();

    const approve = async (id: string) => {
        const proceed = await Asker.danger(
            'Are you sure you want to approve this request?'
        );

        if (!proceed) {
            return;
        }

        approveMutation.mutate(id);
    };

    const reject = async (id: string) => {
        const proceed = await Asker.danger(
            'Are you sure you want to reject this request?'
        );

        if (!proceed) {
            return;
        }

        rejectMutation.mutate(id);
    };

    const data = issues.map((item) => ({
        ...item,
        actions: (
            <div className='flex'>
                <Button
                    color='green'
                    size='sm'
                    className='mx-1'
                    onClick={(e) => {
                        e.preventDefault();
                        if (!item.approved) {
                            approve(item.id);
                        }
                    }}
                    disabled={approveMutation.isLoading || item.approved}
                >
                    Approve
                </Button>
                <Button
                    color='red'
                    size='sm'
                    className='mx-1'
                    onClick={(e) => {
                        e.preventDefault();
                        if (!item.approved) {
                            reject(item.id);
                        }
                    }}
                    disabled={rejectMutation.isLoading || item.approved}
                >
                    Reject
                </Button>
            </div>
        ),
    }));

    const columns = useMemo<TableColumns<Approval>>(
        () => [
            {
                accessorFn: (row) => (
                    <Link
                        to={`/administrator/dashboard/${row.approvable?.id}`}
                        className='text-blue-500 hover:underline font-bold'
                    >
                        {row.approvable?.name}
                    </Link>
                ),
                header: 'Pond',
            },
            {
                accessorFn: (row) =>
                    `${row.approvable?.owner?.first_name} ${row.approvable?.owner?.last_name}`,
                header: 'Owner Name',
            },
            {
                accessorFn: (row) =>
                    row.approved ? (
                        <span className='text-green-400 font-bold'>Yes</span>
                    ) : (
                        <span className='text-red-400 font-bold'>No</span>
                    ),
                header: 'Resolved',
            },
            {
                accessorFn: (row) =>
                    dayjs(row.created_at).format('MMM. DD, YYYY HH:mm A'),
                header: 'Date',
            },
            {
                accessorKey: 'actions' as Valid,
                header: 'Actions',
                enableColumnFilter: false,
                enableColumnOrdering: false,
                enableSorting: false,
            },
        ],
        []
    );

    return <MaterialReactTable columns={columns} data={data} />;
};

export default Approvals;
