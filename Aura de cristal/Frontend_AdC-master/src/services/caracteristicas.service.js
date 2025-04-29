import axios from "axios";
axios.defaults.headers.common['Content-Type'] = 'application/json';

const BASE_URL = "https://auradecristalapi-production.up.railway.app";


export const getCaracteristica = (idProducto) => {
    return axios.get(`${BASE_URL}/productos/caracteristicas/${idProducto}`);
}