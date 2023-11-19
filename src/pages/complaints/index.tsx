import 'react';
import DataTable from 'react-data-table-component';
import { columns } from './rowData';

import './style.css';
import { useEffect, useState } from 'react';
import { ExpandedComponent } from './expandableRow';
import { useAuth } from '../../contexts/useAuth';

export default function Complaints() {
    const { getApi } = useAuth();
    const [data, setData] = useState();

    useEffect(() => {
        const api = getApi();
        
        api?.get(`/api/complaint`)
        .then((response) => {
            console.log(response);
            setData(response.data);
        })
        .catch((error) => {
            console.error(error);
        })
    },[])

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
                    className='border border-secondary-subtle rounded'
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