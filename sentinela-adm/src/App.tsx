import { BrowserRouter } from 'react-router-dom';

import './App.css';

import Menu from './components/menu';
import AppRoutes from './routes/routes';

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Menu />
      <AppRoutes />
    </BrowserRouter>
    </>
  )
}