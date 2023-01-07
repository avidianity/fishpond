import React, { FC, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { TableColumns, Valid } from '@/types/misc';
import { Issue } from '@/types/models/administrator/issue';
import { useIssueList } from '@/hooks/api/administrator/issue';
import dayjs from 'dayjs';
import { Link } from '@tanstack/react-location';
import { Button } from '@material-tailwind/react';
import { usePondDelete } from '@/hooks/api/administrator/pond';
import { Asker } from '@/helpers';

const Issues: FC = () => {
    const issues = useIssueList();
    const mutation = usePondDelete();

    const destroy = async (id: string) => {
        const proceed = await Asker.danger(
            'Are you sure you want to delete this Pond?'
        );

        if (!proceed) {
            return;
        }

        mutation.mutate(id);
    };

    const data = issues.map((item) => ({
        ...item,
        actions: (
            <Button
                color='red'
                onClick={(e) => {
                    e.preventDefault();
                    if (item.pond) {
                        destroy(item.pond.id);
                    }
                }}
                disabled={mutation.isLoading}
            >
                Delete Pond
            </Button>
        ),
    }));

    const columns = useMemo<TableColumns<Issue>>(
        () => [
            {
                accessorFn: (row) => (
                    <Link
                        to={`/administrator/dashboard/${row.pond?.id}`}
                        className='text-blue-500 hover:underline font-bold'
                    >
                        {row.pond?.name}
                    </Link>
                ),
                header: 'Pond',
            },
            {
                accessorFn: (row) =>
                    `${row.pond?.owner?.first_name} ${row.pond?.owner?.last_name}`,
                header: 'Owner Name',
            },
            {
                accessorFn: (row) =>
                    `${row.client?.first_name} ${row.client?.last_name}`,
                header: 'Reported By',
            },
            {
                accessorKey: 'message',
                header: 'Issue',
            },
            {
                accessorFn: (row) =>
                    dayjs(row.created_at).format('MMM. DD, YYYY HH:mm A'),
                header: 'Date Created',
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

export default Issues;
