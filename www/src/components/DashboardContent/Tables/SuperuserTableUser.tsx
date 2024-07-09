import { Column, RowData } from '@tanstack/react-table';
import Table from './Table';
import { useEffect, useState } from 'react';

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'select';
  }
}

const Filter = ({ column }: { column: Column<any, unknown> }) => {
  let columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};

  // console.log(columnFilterValue?.toString())
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

export const SuperuserUserTable = () => {
  return (
    <>
      <Table Filter={Filter} />
    </>
  );
};
