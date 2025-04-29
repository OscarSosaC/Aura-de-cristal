import axios from 'axios';

// URL base de tu API
 export const BASE_URL = 'https://auradecristalapi-production.up.railway.app';
 //export const BASE_URL = 'http://localhost:8080'

// Crear una instancia de Axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funciones de la API
export const getListUser = async () => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/usuarios/listar`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    }
  };

  try {
    return await axios.request(options);
  } catch (error) {
    console.error(error);
  }
}

export const getOneUser = (id) => {
  return api.get(`/api/user/${id}`);
};

export const createUser = (name, lastName, email, password) => {
  return api.post('/auth/register', {
    nombre: name,
    apellido: lastName,
    email: email,
    password: password,
  });
};

export const updateUser = async (id, user) => {
  const options = {
    method: 'PUT',
    url: `${BASE_URL}/usuarios/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
    data: user,
  };

  try {
    return await axios.request(options);
  } catch (error) {
    console.error(error);
  }
};

export const removeUser = (id) => {
  return api.delete(`/api/user/${id}`);
};

export const reSendEmail = async (email) => {
  const options = {
    method: 'POST',
    url: `${BASE_URL}/auth/resend-email?email=${email}`,
  };

  try {
    return await axios.request(options);
  } catch (error) {
    console.error(error);
  }
}  

export const login = (email, password) => {
  return axios.post(`${BASE_URL}/auth/login`, 
      {
          "email": email, 
          "password": password
      }
  )
}

/* Mantener sesión abierta y cerrar sesión */
export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken');
};

export const logout = () => {
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userNombre');
  localStorage.removeItem('userApellido');
  localStorage.removeItem('userRol');
  localStorage.removeItem('userId');
  localStorage.removeItem('userInitials');
};

/* Obtener usuario por email */
export const getUserByEmail = async (userEmail) => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/usuarios/buscar`,
    params: {email: userEmail},
    headers: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    }
  };

  try {
    const { data } = await axios.request(options);
  } catch (error) {
    console.error(error);
  }
}

