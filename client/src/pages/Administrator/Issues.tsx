import React, { FC, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { TableColumns } from '@/types/misc';
import { Issue } from '@/types/models/administrator/issue';
import { useIssueList } from '@/hooks/api/administrator/issue';
import dayjs from 'dayjs';
import { Link } from '@tanstack/react-location';

const Issues: FC = () => {
    const data = useIssueList();

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
        ],
        []
    );

    return <MaterialReactTable columns={columns} data={data} />;
};

export default Issues;
