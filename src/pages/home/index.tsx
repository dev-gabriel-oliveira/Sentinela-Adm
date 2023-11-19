import 'react';

import './style.css';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/useAuth';

export default function Home() {
  const { getApi } = useAuth();
  const api = getApi();

  const [complaintsData, setComplaintsData] = useState<[] | null>(null);
  const [complaintsPartials, setComplaintsPartials] = useState<any | null>(null);

  const [organsData, setOrgansData] = useState<[] | null>(null);

  const getComplaintsData = () => {
    api?.get(`/api/complaint`)
    .then((response) => {
        console.log(response);

        setComplaintsData(response.data);

        const statusTotals = response.data.reduce((totals: any, item: any) => {
          const { status } = item;
          // Inicializa o total para o status se ainda não existir
          totals[status] = (totals[status] || 0) + 1;
          return totals;
        }, {});
        
        // Cria um array com os totais formatados
        const result = {
          enviado: statusTotals['enviado'] || 0,
          em_analise: statusTotals['em analise'] || 0,
          negado: statusTotals['negado'] || 0,
          resolvido: statusTotals['resolvido'] || 0
        };

        setComplaintsPartials(result);
    })
    .catch((error) => {
        console.error(error);
    })
  }

  const getOrgansData = () => {
    api?.get(`/api/organ`)
    .then((response) => {
        console.log(response);
        setOrgansData(response.data);
    })
    .catch((error) => {
        console.error(error);
    })
  }

  useEffect(() => {
    getComplaintsData();
    getOrgansData()
  },[])

  useEffect(() => {

    complaintsPartials ? console.log(complaintsPartials) : null;
    
  })

  return(
    <>
      <h1>Estatísticas</h1>

      <hr />

      <div className="d-flex justify-content-between align-items-top flex-wrap ">
        <div className='numeros-totais'>
          <p className='fs-2'>Números Totais</p>
          <hr />

          <div className="d-flex justify-content-between align-items-center border border-secondary rounded my-3 p-2">
            <h4>Denúncias</h4>
            {complaintsData ? (
              <h2 className='text-success ms-5'>{complaintsData?.length}</h2>
            ):(
              <div className="spinner-border text-success ms-5" role="status">
                <span className="visually-hidden"></span>
              </div>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center border border-secondary rounded my-3 p-2">
            <h4>Orgãos</h4>
            {organsData ? (
              <h2 className='text-success ms-5'>{organsData?.length}</h2>
            ):(
              <div className="spinner-border text-success ms-5" role="status">
                <span className="visually-hidden"></span>
              </div>
            )}
          </div>
        </div>
        
        <div className='casos-inconclusos'>
          <p className='fs-2'>Casos Inconclusos</p>
          <hr />

          <div className="d-flex justify-content-between align-items-center border border-secondary rounded my-3 p-2">
            <h4>Enviados</h4>
            {complaintsPartials ? (
              <h2 className='text-success ms-5'>{complaintsPartials?.enviado}</h2>
            ):(
              <div className="spinner-border text-success ms-5" role="status">
                <span className="visually-hidden"></span>
              </div>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center border border-secondary rounded my-3 p-2">
            <h4>Em Análise</h4>
            {complaintsPartials ? (
              <h2 className='text-success ms-5'>{complaintsPartials?.em_analise}</h2>
            ):(
              <div className="spinner-border text-success ms-5" role="status">
                <span className="visually-hidden"></span>
              </div>
            )}
          </div>
        </div>

        <div className='graficos'>
          <p className='fs-2'>Casos Concluidos</p>
          <hr />

          <div className="d-flex justify-content-between align-items-center border border-secondary rounded my-3 p-2">
            <h4>Negados</h4>
            {complaintsPartials ? (
              <h2 className='text-success ms-5'>{complaintsPartials?.negado}</h2>
            ):(
              <div className="spinner-border text-success ms-5" role="status">
                <span className="visually-hidden"></span>
              </div>
            )}
          </div>

          <div className="d-flex justify-content-between align-items-center border border-secondary rounded my-3 p-2">
            <h4>Resolvidos</h4>
            {complaintsPartials ? (
              <h2 className='text-success ms-5'>{complaintsPartials?.resolvido}</h2>
            ):(
              <div className="spinner-border text-success ms-5" role="status">
                <span className="visually-hidden"></span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}