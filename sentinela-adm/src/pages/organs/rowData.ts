import 'react';

export interface RowData {
  id: number;
  name: string;
  email: string;
  password: string;
  complaints: string;
}

export const columns = [
  {
    name: 'ID',
    selector: (row: RowData) => row.id,
    sortable: true,
  },
  {
    name: 'Nome',
    selector: (row: RowData) => row.name,
    sortable: false,
  },
  {
    name: 'Email',
    selector: (row: RowData) => row.email,
    sortable: false,
  },
  {
    name: 'Denuncias',
    selector: (row: RowData) => row.complaints,
    sortable: false,
  }
];