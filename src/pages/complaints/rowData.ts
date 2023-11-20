import 'react';

export interface Complaint {
  id: number;
  title: string;
  description: string;
  image: string;
  createdAt: string;
  status: string;
  latitude: string;
  longitude: string;
}

export const columns = [
  {
    name: 'ID',
    selector: (row: Complaint) => row.id ? row.id : '###',
    sortable: true,
  },
  {
    name: 'Título',
    selector: (row: Complaint) => row.title ? row.title : '...',
    sortable: false,
  },
  {
    name: 'Data de Envio',
    selector: (row: Complaint) => row.createdAt ? row.createdAt : '...',
    sortable: false,
  },
  {
    name: 'Status',
    selector: (row: Complaint) => row.status ? row.status : '...',
    sortable: false,
  }
];