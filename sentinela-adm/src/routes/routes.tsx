import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import NotFounded from '../pages/not-founded';

export default function AppRoutes() {
    return (
        <main>
            <Routes>
                <Route path='' element={<Home/>}/>
                <Route path='*' element={<NotFounded/>}/>
            </Routes>
        </main>
    )
};
