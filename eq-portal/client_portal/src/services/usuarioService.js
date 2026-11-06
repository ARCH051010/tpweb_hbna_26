import apiClient from './apiClient';

// Funciones para manejar las resquest de los usuarios editores
export const obtenerEditores = async () => {
  try {
    const respuesta = await apiClient.get('/usuarios/editores/');
    // Manejamos la paginación de Django (si la tiene)
    return respuesta.data.results ? respuesta.data.results : respuesta.data;
  } catch (error) {
    console.error("Error al obtener editores:", error);
    throw error;
  }
};

// Crear un nuevo editor
export const crearEditor = async (datosEditor) => {
  try {
    // El backend espera: username, password, email, ci
    const respuesta = await apiClient.post('/usuarios/editores/', datosEditor);
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear editor:", error);
    throw error;
  }
};

// Eliminar un editor por su CI (que es su PK)
export const eliminarEditor = async (ci) => {
  try {
    // Como definimos el CI como llave primaria, la URL queda: /editores/12345678/
    await apiClient.delete(`/usuarios/editores/${ci}/`);
  } catch (error) {
    console.error("Error al eliminar editor:", error);
    throw error;
  }
};

export const actualizarEditor = async (ci, datos) => {
  // Usamos PUT para actualizar (o PATCH si solo envías algunos campos)
  const respuesta = await apiClient.put(`/usuarios/editores/${ci}/`, datos);
  return respuesta.data;
};

// Funciones para manejar las resquest de los usuarios administradores
export const obtenerAdministradores = async () => {
  const respuesta = await apiClient.get('/usuarios/administradores/');
  return respuesta.data.results ? respuesta.data.results : respuesta.data;
};

export const crearAdministrador = async (datos) => {
  const respuesta = await apiClient.post('/usuarios/administradores/', datos);
  return respuesta.data;
};

export const eliminarAdministrador = async (ci) => {
  await apiClient.delete(`/usuarios/administradores/${ci}/`);
};

export const actualizarAdministrador = async (ci, datos) => {
  const respuesta = await apiClient.put(`/usuarios/administradores/${ci}/`, datos);
  return respuesta.data;
};