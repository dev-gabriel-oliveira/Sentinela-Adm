import 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { columns } from './data';

import './style.css';
import { useEffect, useState } from 'react';

export default function Complaints() {
    const [data, setData] = useState();
    const GET_COMPLAINTS_LINK = 'https://sentinela-api-service.onrender.com/api/complaint';

    console.log(GET_COMPLAINTS_LINK);

    useEffect(() => {
        console.log(11111111);
        
        axios.get(GET_COMPLAINTS_LINK)
        .then((response) => {
            console.log(2222222);
            
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        })
    })
    

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
                />
            ):(
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            
        </>
    )
}