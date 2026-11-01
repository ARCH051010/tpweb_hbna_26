import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';
import { set } from 'zod';

// Creamos el objeto contexto para poder enviar el usuario autenticadoy el rol
const AuthContext = createContext();

// Consumir el valor del contexto
export const useAuth = () => useContext(AuthContext);

// Para crear los aspectos que va a brindar el objeto Contexto creado
export const AuthProvider = ({ children }) => {

  // Estado para cambiar de usuario
  const [user, setUser] = useState(null);

  // Estado para saber si está cargando la petición
  const [loading, setLoading] = useState(true);

  // Instancia de Navigate de react-router para dirigir a otra página
  const navigate = useNavigate();

  // Al cargar la app, verificamos si hay un token guardado, se ejecuta siempre que se renderiza la page 
  useEffect(() => {

    // Obtiene los datos del usuario y el token que se la ha asignado
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');
    
    // Si la data del usuario y el token están
    if (token && userData) {
      try {
      // Parseamos la data del usuario a JSON y lo ponemos como usuario logueado
      setUser(JSON.parse(userData));
      }catch (error) {
        console.error("Error al parsear user_data:", error);
        setUser(null);
      }
    }

    setLoading(false);
  }, []);
  
  // Función asincrona de login que se hereda en los componentes a los cuales se le pase como contexto a AuthContext 
  // Y para hacer la petición para saber si el usuario ha ingresado los datos correctos
  const login = async (username, password) => {
  try {
    
    // Pedimos el token a JWT
    const response = await apiClient.post('/token/', { username, password });

    // Obtenemos los valores devueltos que serían el token de acceso y el de refresco
    const { access, refresh } = response.data;
    
    // Guardamos en el localStorage la clave valor access_token con su valor del Token de acceso generado por JWT
    localStorage.setItem('access_token', access);

    // Guardamos el token de refresco en el localStorage
    localStorage.setItem('refresh_token', refresh);

    // Decodificamos el token para leer el rol que le pusimos en Django que viene en la parte del payLoad de JWT al token de acceso
    const payloadBase64 = access.split('.')[1];

    // Reemplazamos caracteres para que funcione en el navegador
    const payloadDecoded = JSON.parse(window.atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/')));

    // Guardamos en  userData el nombre de usuario y el rol a partir de los datos que vienen encriptados en payload del JWT
    const userData = { 
      username: payloadDecoded.username, 
      rol: payloadDecoded.rol 
    };

    // Parseamos los datos a formato JSON 
    localStorage.setItem('user_data', JSON.stringify(userData));
    // Actualizamos los valores del usuario
    setUser(userData);
    
    // Navegamos al dashboards, pues ya el usuario está autenticado
    navigate('/dashboard');

    // Si todo fue bien retornamos true
    return true;

  } catch (error) {

    // Si algo sale mal mostramos el error
    console.error("Error en login:", error);

    // Y retornamos false
    return false;
  }
  };

  // Función para logout para pasar como contexto a los componentes
  const logout = () => {

    // Eliminamos del localStorage el access token, el refresh y quitamos la info del usuario
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');

    // Quitamos al usuario que antes estaba logueado
    setUser(null);

    // Y dirigmos al login nuevamente
    navigate('/login');
  };

  return (

    // Hacemos que el objeto Contexto brinde los métodos y si el usuario está login o no
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};