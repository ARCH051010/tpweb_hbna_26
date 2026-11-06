import apiClient from './apiClient';

// 1. OBTENER TODOS LOS EVENTOS (Para la tabla del dashboard y la agenda pública)
export const obtenerEventos = async () => {
  try {
    const respuesta = await apiClient.get('/noticias/eventos/');
    
    // Manejamos la paginación de Django
    return respuesta.data.results ? respuesta.data.results : respuesta.data;
  } catch (error) {
    console.error("Error al obtener eventos:", error);
    throw error;
  }
};

export const crearEventoAdmin = async (datos) => {
  const respuesta = await apiClient.post('/noticias/eventos/', datos);
  return respuesta.data;
};

export const eliminarEventoAdmin = async (id) => {
  await apiClient.delete(`/noticias/eventos/${id}/`);
};

export const actualizarEventoAdmin = async (id, datos) => {
  const respuesta = await apiClient.put(`/noticias/eventos/${id}/`, datos);
  return respuesta.data;
};