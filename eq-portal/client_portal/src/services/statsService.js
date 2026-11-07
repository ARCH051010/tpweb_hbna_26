import apiClient from './apiClient';

export const obtenerEstadisticas = async () => {
  try {
    const respuesta = await apiClient.get('/estadisticas/');
    return respuesta.data;
  } catch (error) {
    console.error("Error al cargar estadísticas:", error);
    throw error;
  }
};