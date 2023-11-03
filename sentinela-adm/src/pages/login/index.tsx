import 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/useAuth';

import './style.css';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const emailInput = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (emailInput.current && emailInput.current.value !== 'user@mail.com') {
            alert('errou o ususario');
            return;
        }
        
        if (password.current && password.current!.value !== '111') {
            alert('errou a senha');
            return;
        }

        login(emailInput.current!.value, password.current!.value);
        navigate('/home');
    }
    
    return(
        <div className='pt-5'>
            <h1 className='text-center'>Login</h1>

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