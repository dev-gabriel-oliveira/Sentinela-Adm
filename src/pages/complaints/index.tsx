import 'react';
import DataTable from 'react-data-table-component';
import { columns } from './rowData';

import './style.css';
import { useEffect, useState } from 'react';
import { ExpandedComponent } from './expandableRow';
import { useAuth } from '../../contexts/useAuth';

export default function Complaints() {
    const { getApi } = useAuth();
    const api = getApi();

    const [data, setData] = useState();

    const getComplaints = () => {
        api?.get(`/api/complaint`)
        .then((response) => {
            setData(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
    };

    useEffect(() => {
        getComplaints();
    });

    useEffect(() => {
        // Código para executar a cada 5 segundos
        const interval = setInterval(() => {
            getComplaints();
        }, 5000);
     
        // Limpeza do intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, []);

    return(
        <>
            <h1>Denúncias</h1>

            <hr />

            <div className='input-group'>
                <input className="form-control border border-secondary" type="text" />
                <button className='btn btn-secondary'><i className="bi bi-search fs-5" /></button>
            </div>

            <br />

            {data ? (
                <DataTable
                    className='border border-bottom-0'
                    columns={columns}
                    data={data}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                    pagination
                />
            ):(
                <>
                <h5 className="text-success">Carregando...</h5>
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden"></span>
                </div>
                </>
            )}
            
        </>
    )
}