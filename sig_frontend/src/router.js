import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Home = lazy(()=>import('./pages/Home'))


export default () =>{
    return (
        <Routes>
            <Route path="/" element={ <Suspense fallback={<>...</>}><Home /></Suspense>} />
        </Routes>
    )
}