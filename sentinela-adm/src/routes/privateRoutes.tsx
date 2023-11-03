import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

export function PrivateRoute({ element, path }: { element: React.ReactNode, path: string }) {
    const { user } = useAuth();

    return user !== null ? (
        <Route path={path} element={element} />
    ) : (
        <Navigate to="/" />
    );
}