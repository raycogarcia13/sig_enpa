import axios from 'axios'
import localStorageUtil from "../utils/storage"

const sec_uri = process.env.NODE_ENV == 'development' ? 'http://localhost:4000/api/v1' : 'http://sig.enpa.iju.minag.cu/api_secured/'
const cont_uri = process.env.NODE_ENV == 'development' ? 'http://localhost:4001/api/v1' : 'http://sig.enpa.iju.minag.cu/api_contratos/'


let api_security = axios.create({ baseURL: sec_uri});
api_security.defaults.withCredentials = true;

let api_contratacion = axios.create({ baseURL: cont_uri});
api_contratacion.defaults.withCredentials = true;


api_contratacion.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        alert('Sesión expirada')
        localStorageUtil.clearToken();
        localStorageUtil.clear('user');
        window.location.reload();

    } else {
        return Promise.reject(error);
    }
});
api_security.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        alert('Sesión expirada')
        localStorageUtil.clearToken();
        localStorageUtil.clear('user');
        window.location.reload();

    } else {
        return Promise.reject(error);
    }
});


export {
    api_security,
    api_contratacion
};