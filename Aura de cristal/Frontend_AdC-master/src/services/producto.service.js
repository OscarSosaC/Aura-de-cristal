import axios from 'axios';

// URL base del backend 
const BASE_URL = 'https://auradecristalapi-production.up.railway.app';

export const getListProduct = async () => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/productos/listar`,
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

export const getListProductRandom = async () => {
  const options = {
    method: 'GET',
    url: `${BASE_URL}/productos/aleatorios`
  };

  try {
    return await axios.request(options);
  } catch (error) {
    console.error(error);
  }
}

// Servicio para agregar un nuevo producto.
export const agregarProducto = async (
  nombre, 
  descripcion, 
  precioAlquiler, 
  categoriaId, 
  tematicaId, 
  imagenes, 
  caracteristicaIds) => {
  
  const token = localStorage.getItem('authToken'); // Obtén el token dinámicamente
  
  if (!token) {
    console.error("Error: No se encontró un token de autenticación.");
    throw new Error("No se encontró un token de autenticación.");
  }

  console.log("nombre", nombre);
  console.log("descripcion", descripcion);
  console.log("precioAlquiler", precioAlquiler);
  console.log("categoriaId", categoriaId);
  console.log("tematicaId", tematicaId);
  console.log("imagenes", imagenes);
  console.log("caracteristicaIds", caracteristicaIds);



  try {
    const response = await axios.post(
      `${BASE_URL}/productos/registrar`,
      {
        "nombre": nombre,
        "descripcion": descripcion,
        "precio_alquiler": precioAlquiler, 
        "categoria_id": categoriaId,
        "tematica_id": tematicaId,
        "imagenes": imagenes,
        "caracteristicaIds": caracteristicaIds,        
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    console.log("Producto registrado con éxito:", response.data);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error("Error al registrar producto:", error.response?.data || error.message);
    throw error;
  }
};

//Servicio para obtener todos los productos.
export const obtenerProductos = () => {
  const token = localStorage.getItem('authToken');
  return axios.get(`${BASE_URL}/productos/listar`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Servicio para eliminar un producto.
export const eliminarProducto = (id) => {
  const token = localStorage.getItem('authToken');
  return axios.delete(`${BASE_URL}/productos/eliminar/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Servicio para actualizar un producto.
export const actualizarProducto = (id, nombre, descripcion, precioAlquiler, disponibilidad, inventario, categoriaId, tematicaId, imagenes, caracteristicaIds) => {
  const token = localStorage.getItem('authToken');
  return axios.put(`${BASE_URL}/productos/actualizar/${id}`, 
    {
      "nombre": nombre,
      "descripcion": descripcion,
      "precio_alquiler": precioAlquiler,
      "disponibilidad": disponibilidad,
      "inventario": inventario,
      "categoria_id": categoriaId,
      "tematica_id": tematicaId,
      "imagenes": imagenes,
      "caracteristicaIds": caracteristicaIds,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }
  );
};

export const obtenerCategorias = () => {
  const token = localStorage.getItem('authToken');
  return axios.get(`${BASE_URL}/categorias/listar`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const obtenerTematicas = () => {
  const token = localStorage.getItem('authToken');
  return axios.get(`${BASE_URL}/tematicas/listar`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
}

export const obtenerCaracteristicas = () => {
  const token = localStorage.getItem('authToken');
  return axios.get(`${BASE_URL}/caracteristicas/listar`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
}

export default {
  agregarProducto,
  obtenerProductos,
  eliminarProducto,
  actualizarProducto,
  obtenerCategorias,
  obtenerTematicas,
  obtenerCaracteristicas,
};
