import { ExpanderComponentProps } from 'react-data-table-component';
import { Complaint } from "./rowData";
import { useRef } from 'react';
import { useAuth } from '../../contexts/useAuth';

export const ExpandedComponent: React.FC<ExpanderComponentProps<Complaint>> = ({ data }) => {
    const { getApi, logout } = useAuth();

    const statusInput = useRef<HTMLInputElement | null>(null);

    const changeStatus = async () => {
        if (window.confirm(`Deseja alterar o Status da Denúncia "${data.id}?"`)) {
            const api = getApi();

            const statusData = {
                "status": statusInput?.current?.value
            }

            api?.patch(`/api/complaint/${data.id}`, statusData)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                if (error) {
                    console.error(error);
                    alert('Seu tempo de uso expirou, faça o login novamente!')
                    logout();
                }
            });
        }
    }

    return (
        <div className='d-flex justify-content-between align-items-center px-5 py-3'>
            <div>
                <p><strong>ID:</strong> {data.id}</p>
                <p><strong>Título:</strong> {data.title}</p>
                <p><strong>Descrição:</strong> {data.description}</p>
                <p><strong>Latidude:</strong> {data.latitude}</p>
                <p><strong>Longitude:</strong> {data.longitude}</p>
            </div>

            <img className='img-fluid mx-5' src={data.image} alt="" height={'100%'} width={'100rem'}/>

            <div style={{width:'300px'}}>
                <p className="d-inline-flex gap-1">
                    <button className="btn btn-secondary fs-6" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <i className="bi bi-chevron-bar-expand"></i>
                        <p>Status</p>
                    </button>
                </p>
                <div className="collapse" id="collapseExample">
                    <div className="d-inline-block card card-body">
                        <input className='my-2' type="text" ref={statusInput} />
                        <button className='btn btn-success fs-6' onClick={() => {changeStatus()}}>Atualizar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};