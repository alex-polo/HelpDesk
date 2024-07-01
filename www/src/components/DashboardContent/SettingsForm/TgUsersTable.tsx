import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';

type Props = {
  objectName: string;
};

type Person = {
  firstName: string;
  lastName: string;
  status: string;
  progress: number;
};

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    status: 'Активен',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    status: 'Отключен',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    status: 'Активен',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    status: 'Активен',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    status: 'Отключен',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    status: 'Активен',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    status: 'Активен',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    status: 'Отключен',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    status: 'Активен',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    status: 'Активен',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    status: 'Отключен',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    status: 'Активен',
    progress: 10,
  },
  {
    firstName: 'tanner',
    lastName: 'linsley',
    status: 'Активен',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    status: 'Отключен',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    status: 'Активен',
    progress: 10,
  },
];

const TgUsersTable = (props: Props) => {
  console.log(props);
  const columnHelper = createColumnHelper<Person>();

  const columns = [
    columnHelper.accessor('firstName', {
      cell: (info) => info.getValue(),
      //   footer: (info) => info.column.id,
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: 'lastName',
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
      //   footer: (info) => info.column.id,
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      //   footer: (info) => info.column.id,
    }),
    columnHelper.accessor('progress', {
      header: 'Profile',
      //   footer: (info) => info.column.id,
    }),
  ];

  const [data, _setData] = React.useState(() => [...defaultData]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="p-2">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
        <div className="h-4" />
        <button onClick={() => rerender()} className="border p-2">
          Rerender
        </button>
      </div>
    </>
  );
};

export default TgUsersTable;
