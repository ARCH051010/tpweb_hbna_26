import axios from 'axios';

// Creamos una instancia personalizada de Axios para tener la url base de la api la comunicación entre el servidor y el client
const apiClient = axios.create({
  // Aquí ponemos la URL base de la api para no repetir la url. 
  baseURL: 'http://localhost:8000/api', 
  timeout: 10000, // Si el servidor tarda más de 10 segundos, cancela la petición
  headers: {
    'Content-Type': 'application/json', // Decidmos qué tipo de formtato (JSON) tiene el cuerpo de la petición o la respuesta de la api axios
  },
});

// INTERCEPTOR DE PETICIONES: Inteceptor toma del localStorage el token del usuario y lo pone en la petición antes de enviar la información al backend
// Usamos la parte del interceptor vinculado a los datos del cliente
// (Use) captura todas las peticiones que salgan de esta aplicación con dirección al backend
// config son las configuraciones de la petición que se está lanzando que contiene url, headers, data, etc)
// Usamos este interceptor para que a todas las peticiones se le aplique esta lógica
apiClient.interceptors.request.use(
  (config) => {

    // Obtenemos la información del token que está en el localStorage con la clave access_token
    const token = localStorage.getItem('access_token');

    // Si el token ha guardado el Token
    if (token) {

      // Agrega el header de autorización de la request, con el token del usuario portador que tiene acceso
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Devolver config para que la request pueda llegar al backend
    return config;
  },

  // Para manejar algún error antes de que la información se envíe al back
  (error) => Promise.reject(error)
);

export default apiClient;