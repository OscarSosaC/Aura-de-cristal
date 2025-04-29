import axios from 'axios';

// URL base de tu API
 export const BASE_URL = 'https://auradecristalapi-production.up.railway.app';
 //export const BASE_URL = 'http://localhost:8080'

// Funciones de la API
export const getListCategory = async () => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/categorias/listar`
  };

  try {
    return await axios.request(options);
  } catch (error) {
    console.error(error);
  }
}
