import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

import Login from '../pages/login';
import Home from '../pages/home';
import Complaints from '../pages/complaints';
import NotFounded from '../pages/not-founded';

interface RouteProps{
    Component:  React.ElementType;
}

const Public = ({ Component }: RouteProps) => {
    const { user } = useAuth();

    const location = useLocation().pathname;
    if (user && location === '/') {
        return <Home />;
    }
    return <Component />;
};

const Private = ({ Component }: RouteProps) => {
    const { user } = useAuth();

    if (user) {
        return <Component />;
    }
    return <Login />;
};

export default function AppRoutes() {
    return (
        <main>
            <Routes>
                <Route path='' element={<Public Component={Login}/>}/>

                <Route path='/home' element={<Private Component={Home}/>}/>
                <Route path='/complaints' element={<Private Component={Complaints}/>}/>
                <Route path='*' element={<Private Component={NotFounded}/>}/>
            </Routes>
        </main>
    )
};
