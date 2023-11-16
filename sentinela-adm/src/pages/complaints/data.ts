import 'react';

interface RowData {
  id: number;
  title: string;
  description: string;
  media: string;
  send_date: string;
  status: string;
  public_agency: string;
}

export const columns = [
  {
    name: 'ID',
    selector: (row: RowData) => row.id,
  },
  {
    name: 'Título',
    selector: (row: RowData) => row.title,
  },
  {
    name: 'Descrição',
    selector: (row: RowData) => row.description,
  },
  {
    name: 'Mídia',
    selector: (row: RowData) => row.media,
  },
  {
    name: 'Data de Envio',
    selector: (row: RowData) => row.send_date
  },
  {
    name: 'Status',
    selector: (row: RowData) => row.status,
  },
  {
    name: 'Orgão Responsável',
    selector: (row: RowData) => row.public_agency,
  },
];

/*
[
  {
    id: 1,
    text: "Texto de exemplo",
    media: "Mídia de exemplo",
    send_date: "12/12/2023",
    status: "Status de exemplo",
    public_agency: "Orgão de exemplo"
  },
  {
    id: 2,
    text: "Texto de exemplo 2",
    media: "Mídia de exemplo 2",
    send_date: "13/12/2023",
    status: "Status de exemplo 2",
    public_agency: "Orgão de exemplo 2"
  }
]
*/