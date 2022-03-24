import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Login = lazy(()=>import('./template/Login'))
const Home = lazy(()=>import('./template/Base'))


function App() {
  return (
    <>
      <Routes>
          <Route path="/login" element={ <Suspense fallback={<>...</>}><Login /></Suspense>} />
          <Route path="/" element={ <Suspense fallback={<>...</>}><Home /></Suspense>} />
      </Routes>
    </>
  );
}

export default App;
