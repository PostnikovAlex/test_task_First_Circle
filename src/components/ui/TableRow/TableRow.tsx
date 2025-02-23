import React, { ReactNode } from 'react';
import styles from './TableRow.module.scss';

interface TableRowProps<T extends Record<string, ReactNode>> {
  data: T;
  fields: (keyof T)[];
}

const TableRow = <T extends Record<string, ReactNode>>({ data, fields }: TableRowProps<T>) => {
  return (
    <tr className={styles.row}>
      {fields.map((field) => (
        <td className={styles.cell} key={field.toString()}>{data[field]}</td>
      ))}
    </tr>
  );
};


export default TableRow;