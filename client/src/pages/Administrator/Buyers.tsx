import React, { FC, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { Button } from '@material-tailwind/react';
import { TableColumns, Valid } from '@/types/misc';
import { Buyer } from '@/types/models/administrator/buyer';
import { useBuyerDestroy, useBuyerList } from '@/hooks/api/administrator/buyer';
import { Asker } from '@/helpers';

const Buyers: FC = () => {
    const buyers = useBuyerList();
    const mutation = useBuyerDestroy();

    const destroy = async (id: string) => {
        const proceed = await Asker.danger(
            'Are you sure you want to delete this Buyer?'
        );

        if (!proceed) {
            return;
        }

        await mutation.mutateAsync(id);
    };

    const data = buyers.map((item) => ({
        ...item,
        actions: (
            <Button
                color='red'
                onClick={(e) => {
                    e.preventDefault();
                    destroy(item.id);
                }}
                disabled={mutation.isLoading}
            >
                Delete
            </Button>
        ),
    }));

    const columns = useMemo<TableColumns<Buyer>>(
        () => [
            {
                accessorFn(row) {
                    return (
                        <span className='font-bold'>
                            {row.id.toUpperCase()}
                        </span>
                    );
                },
                header: 'ID',
            },
            {
                accessorKey: 'first_name',
                header: 'First Name',
            },
            {
                accessorKey: 'last_name',
                header: 'Last Name',
            },
            {
                accessorKey: 'email',
                header: 'Email',
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

export default Buyers;
