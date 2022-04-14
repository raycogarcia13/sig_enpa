import { 
    lazy, 
    Suspense
  } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider} from './auth'


const Home = lazy(()=>import('./pages/Home'))
const Contratos = lazy(()=>import('./pages/Contratos'))
const Servicios = lazy(()=>import('./pages/Servicios'))
const Cliente = lazy(()=>import('./pages/Cliente'))
const Erro404 = lazy(()=>import('./pages/Error404'))

export default () =>{
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={ <Suspense fallback={<>...</>}><Home /></Suspense>} />
                <Route path="/contratacion" element={ <Suspense fallback={<>...</>}><Contratos /></Suspense>} />
                <Route path="/servicios" element={ <Suspense fallback={<>...</>}><Servicios /></Suspense>} />
                <Route path="/clients" element={ <Suspense fallback={<>...</>}><Cliente /></Suspense>} />
                <Route path="*" element={ <Suspense fallback={<>...</>}><Erro404 /></Suspense>} />
            </Routes>
        </AuthProvider>
    )
}

