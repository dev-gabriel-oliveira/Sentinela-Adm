import 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';

import './style.css';
import axios from 'axios';
import { API_BASE_URL } from '../../global/API_BASE_URL';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const emailInput = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            "login": emailInput?.current?.value,
            "password": password?.current?.value
        }

        axios.post(`${API_BASE_URL}/api/auth/login`, data)
        .then((response) => {
            console.log(response);
            if (response.status === 201) {
                login(
                    emailInput.current!.value,
                    password.current!.value,
                    response.data.acessToken,
                    response.data.refreshToken
                );
                navigate('/home');
            }
        })
        .catch((error) => {
            if(error){
                console.error(error);
                alert(`Error Status ${error.response.status}`);
            }
        })
    }
    
    return(
        <div className='pt-5'>
            <h1 className='text-center m-0 pt-4'>Sentinela</h1>
            <p className='text-center m-0'>Área do Administrador</p>

            <div className="d-flex justify-content-center">
                <form onSubmit={handleSubmit}>
                    <hr />

                    <label>Email</label>
                    <input type='email' className="form-control" ref={emailInput} />

                    <br />

                    <label>Senha</label>
                    <input type="password" className="form-control" ref={password} />

                    <hr />
                    
                    <button type='submit' className='form-control btn btn-success justify-content-center mx-0 fs-4'>Entrar</button>
                </form>
            </div>
        </div>
    )
}