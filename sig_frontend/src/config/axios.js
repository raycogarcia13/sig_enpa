import axios from 'axios'

let api_security = axios.create({ baseURL: 'http://localhost:4000/api/v1'});
api_security.defaults.withCredentials = true;

let api_contratacion = axios.create({ baseURL: 'http://localhost:4001/api/v1'});
api_contratacion.defaults.withCredentials = true;

export {
    api_security,
    api_contratacion
};