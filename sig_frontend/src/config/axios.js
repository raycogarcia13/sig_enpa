import axios from 'axios'

const sec_uri = process.env.NODE_ENV == 'DEVELOPMENT' ? 'http://localhost:4000/api/v1' : 'http://secured_sig.enpa.iju.minag.cu/api/v1'
const cont_uri = process.env.NODE_ENV == 'DEVELOPMENT' ? 'http://localhost:4001/api/v1' : 'http://contratos_sig.enpa.iju.minag.cu/api/v1'

// console.log(process.env)

let api_security = axios.create({ baseURL: sec_uri});
api_security.defaults.withCredentials = true;

let api_contratacion = axios.create({ baseURL: cont_uri});
api_contratacion.defaults.withCredentials = true;

export {
    api_security,
    api_contratacion
};