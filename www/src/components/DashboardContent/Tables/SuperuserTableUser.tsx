import { Column, ColumnDef, RowData } from '@tanstack/react-table';
import Table from './Table';
import { HTMLProps, useEffect, useMemo, useRef, useState } from 'react';
import { useAllUsersObjectus } from '../../../services/Objectus';
import { IUser } from '../../../services/Objectus/objectus.types';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'select';
  }
}

const Filter = ({ column }: { column: Column<any, unknown> }) => {
  let columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  return filterVariant === 'select' ? (
    <select
      onChange={(e) => {
        column.setFilterValue(e.target.value);
      }}
      value={columnFilterValue?.toString()}
    >
      {/* See faceted column filters example for dynamic select options */}
      <option value="">Все</option>
      <option value="true" label="Да" />
      <option value="false" label="Нет" />
    </select>
  ) : (
    <DebouncedInput
      className="w-36 border shadow rounded"
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      type="text"
      value={(columnFilterValue ?? '') as string}
    />
    // See faceted column filters example for datalist search suggestions
  );
};

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
}

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type="checkbox" ref={ref} className={className + ' cursor-pointer'} {...rest} />;
}

export const SuperuserUserTable = () => {
  const { data: serverData } = useAllUsersObjectus();

  const data = useMemo(() => serverData ?? [], [serverData]);
  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        id: 'select',
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        accessorKey: 'email',
        id: 'email',
        header: () => 'Логин',
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.first_name,
        id: 'first_name',
        header: 'Имя',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'second_name',
        id: 'second_name',
        header: 'Фамилия',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'surname',
        id: 'surname',
        header: 'Отчество',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'is_active',
        accessor: 'is_active',
        id: 'is_active',
        header: 'Активен',
        meta: {
          filterVariant: 'select',
        },

        cell: (info) => (info.getValue() ? 'Да' : 'Нет'),
      },
      {
        accessorKey: 'is_superuser',
        id: 'is_superuser',
        header: 'Администратор',
        meta: {
          filterVariant: 'select',
        },
      },
      {
        accessorKey: 'is_tg_bot',
        id: 'is_tg_bot',
        header: 'Пользователь для бота',
        meta: {
          filterVariant: 'select',
        },
        cell: (info) => (info.getValue() ? 'Да' : 'Нет'),
      },
      {
        accessorKey: 'is_verified',
        id: 'is_verified',
        header: 'Пользователь проверен',
        meta: {
          filterVariant: 'select',
        },
        cell: (info) => (info.getValue() ? 'Да' : 'Нет'),
      },
    ],
    []
  );

  const refreshData = () => {};

  return (
    <>
      <Table Filter={Filter} columns={columns} data={data} refreshData={refreshData} />
    </>
  );
};
