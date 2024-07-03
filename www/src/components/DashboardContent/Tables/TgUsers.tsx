import {
  ColumnDef,
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { defaultData } from './models';
import { useMemo, useState } from 'react';
import { IPerson } from '../../../services/Objectus';

type Props = {
  objectName: string;
};

const columnHelper = createColumnHelper<IPerson>();

export const TgUsersTable = (_props: Props) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [data, _setData] = useState(() => [...defaultData]);
  // const [data, _setData] = React.useState(() => [...defaultData]);
  // const rerender = useReducer(() => ({}), {})[1];

  const columns = useMemo<ColumnDef<IPerson, any>[]>(
    () => [
      {
        accessorKey: 'firstName',
        cell: (info) => <a href="#111">{info.getValue()}</a>,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        id: 'fullName',
        header: 'Full Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'age',
        header: () => 'Age',
        meta: {
          filterVariant: 'range',
        },
      },
      {
        accessorKey: 'visits',
        header: () => <span>Visits</span>,
        meta: {
          filterVariant: 'range',
        },
      },
      {
        accessorKey: 'status',
        header: 'Status',
        meta: {
          filterVariant: 'select',
        },
      },
      {
        accessorKey: 'progress',
        header: 'Profile Progress',
        meta: {
          filterVariant: 'range',
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <>
                        <div
                          {...{
                            className: header.column.getCanSort() ? 'cursor-pointer select-none' : '',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter() ? <div>{/* <Filter column={header.column} /> */}</div> : null}
                      </>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
