import axios from 'axios'

let api_security = axios.create({ baseURL: 'http://localhost:4000/api/v1'});
api_security.defaults.withCredentials = true;

export {api_security};