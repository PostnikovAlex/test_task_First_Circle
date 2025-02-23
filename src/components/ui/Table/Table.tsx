import React from 'react'
import styles from './Table.module.scss';

interface TableProps {
    headers: string[];
    children: React.ReactNode;
  }

const Table: React.FC<TableProps> = ({ headers, children }) => {
    return (
        <div className={styles.table}>
        <div className={styles.tableHeader}>
            {headers.map((header, index) => (
                <div key={index} className={styles.headerCell}>
                {header}
                </div>
            ))}
        </div>
        {children}
        </div>
    );
};

export default Table;
