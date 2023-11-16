import { Link, NavLink } from 'react-router-dom';
import { useAuth } from "../../contexts/useAuth";

import './style.css';

export default function Menu() {
    const { user, logout } = useAuth();

    return(
        <>
        {user ? (
            <menu>
                <ul>
                    <li>
                        <Link to="/home">
                            <img src="favicon.png" alt=""/>
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <NavLink to={"/home"}>Dashboard</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to={"/complaints"}>Denúncias</NavLink>
                    </li>
                    <li className='nav-item'>
                        <NavLink to={"/orgaos"}>Órgãos</NavLink>
                    </li>
                </ul>

                <div className="btn-group user-dropdown">
                    <button className="d-flex align-items-center dropdown-toggle nav-item" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="bi bi-person-circle" />
                        <p className='mx-1 my-0'>Usuário</p>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end text">
                        <li>
                            <NavLink to={"/perfil"}>Perfil</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/historico"}>Histórico</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/"} onClick={() => {logout()}}>Sair</NavLink>
                        </li>
                    </ul>
                </div>
            </menu>
        ):('')}
        </>
    )
}