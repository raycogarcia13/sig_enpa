import { 
  lazy, 
  Suspense, 
} from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { AuthProvider, ProtectedRoute, NoAuthRoute } from "./auth"
import "antd/dist/antd.css";

const Login = lazy(()=>import('./template/Login'))
const Home = lazy(()=>import('./template/Base'))


const App = () => {
 
  return (
    <Provider store={store}>
      <AuthProvider>
          <Routes>
              <Route path="/login" element={ <NoAuthRoute><Suspense fallback={<>...</>}><Login login={null} /></Suspense></NoAuthRoute>} />
              <Route path="*" element={ <ProtectedRoute><Suspense fallback={<>...</>}><Home /></Suspense></ProtectedRoute>} />
          </Routes> 
      </AuthProvider>
    </Provider>
  );
}

export default App;
