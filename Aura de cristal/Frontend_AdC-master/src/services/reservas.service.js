// src/services/reservas.service.js

import { BASE_URL } from "./user.service";

const getToken = () => localStorage.getItem("authToken");
const getUserId = () => localStorage.getItem("userId");

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`,
};

const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
  };
}
// PUT: Actualizar reserva
export const actualizarReserva = async (idReserva, productoId, usuarioId, fechaInicio, fechaFin) => {
  try {
    const response = await fetch(`${BASE_URL}/reservas/${idReserva}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify({
        productoId,
        usuarioId,
        fechaInicio,
        fechaFin,
      }),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar la reserva');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// POST: Registrar nueva reserva
export const registrarReserva = async (productoId, usuarioId, fechaInicio, fechaFin) => {
  try {
    const response = await fetch(`${BASE_URL}/reservas/registrar`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        productoId,
        usuarioId,
        fechaInicio,
        fechaFin,
      }),
    });
    if (!response.ok) {
      return response.status;
    }
    const data = await response.json();  // Esperamos que la respuesta se convierta en JSON
      return {
        status: response.status,  // Código de estado HTTP
        data  // Los datos de la respuesta
      };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET: Obtener reservas por usuario
export const obtenerReservasPorUsuario = async (usuarioId) => {
  try {
    const response = await fetch(`${BASE_URL}/reservas/usuario/${usuarioId}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error('Error al obtener las reservas del usuario');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// GET: Obtener reservas por producto
export const obtenerReservasPorProducto = async (productoId) => {
  try {
    const response = await fetch(`${BASE_URL}/reservas/producto/${productoId}`, {
      method: 'GET',
      headers: headers,
    });
    if (!response.ok) {
      throw new Error('Error al obtener las reservas del producto');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
