import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Importamos los esquemas
import { schemaLogin, schemaRegistro } from "../../schemas/authSchemas"; 

// Importamos el contexto creado para la autenticación
import { useAuth } from "../../context/AuthContext";

// Incluimos la conexión axios para poder hacer las peticiones
import apiClient from "../../services/apiClient";
import "./login.css";

import PasswordInput from "../../pages/auth/PasswordInput";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);

  // Para errores de API (credenciales incorrectas)
  const [errorGlobal, setErrorGlobal] = useState(""); 
  const [cargando, setCargando] = useState(false);
  
  // Incluimos la función login del contexto
  const { login } = useAuth();

  //Seleccionamos el schema de acuerdo a el tipo de operación
  // useMemo evita que Zod se re-calcule en cada render, solo cuando isLogin cambia
  const schemaActual = useMemo(() => isLogin ? schemaLogin : schemaRegistro, [isLogin]);

  // Configuración de React Hook Form
  const {
    register, // Para registrar los inputs
    handleSubmit, // Manejador del submit
    formState: { errors }, // Para tomar los errores
    reset, // Para limpiar el formulario al cambiar de modo
    setError // Para inyectar errores manuales (ej. del backend)
  } = useForm({
    resolver: zodResolver(schemaActual), // Conecta hook form con zod en dependencia del schema seleccionado
  });

  // Función asincrona que lleva la info al backend si todo es correcto
  const onSubmit = async (data) => {
    setErrorGlobal("");
    setCargando(true);

    try {
      if (isLogin) {
        const exito = await login(data.username, data.password);
        if (!exito) {
          setErrorGlobal("Credenciales incorrectas. Verifica tu usuario y contraseña.");
        }
      } else {
          //Para que la confirmación de la clave no se envíe al backend
          const { confirmPassword, ...datosParaBackend } = data;
        try {
          // Intentamos registrar en Django
          await apiClient.post('/usuarios/editores/', {
            username: data.username,
            password: data.password,
            email: data.email,
            ci: data.ci
          });
          
          // Si el registro es exitoso, lo logueamos
          await login(data.username, data.password);
          
        } catch (registerError) {
          // Si Django rechaza el registro (ej. CI duplicado), atrapamos el error
          const backendErrors = registerError.response?.data;
          
          if (backendErrors) {
            // Mapeamos los errores de Django a los inputs de React Hook Form
            if (backendErrors.ci) setError("ci", { type: "manual", message: backendErrors.ci[0] });
            if (backendErrors.username) setError("username", { type: "manual", message: backendErrors.username[0] });
            if (backendErrors.email) setError("email", { type: "manual", message: backendErrors.email[0] });
          } else {
            setErrorGlobal("Error al intentar registrar el usuario.");
          }
        }
      }
    } catch (err) {
      setErrorGlobal("Error de conexión. Revisa tu red.");
    } finally {
      setCargando(false);
    }
  };

  // Función para cambiar entre Login y Registro y limpiar el formulario
  const toggleMode = () => {
    setIsLogin(!isLogin); // si es isLogin es True lo pone en false
    reset(); // Limpia los campos y los errores
    setErrorGlobal("");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="login-logo">🐊</span>
          <h2>Portal FTI</h2>
          <p>{isLogin ? "Accede a tu cuenta" : "Regístrate como Editor"}</p>
        </div>

        {/* Error global Credenciales incorrectas) */}
        {errorGlobal && <div className="login-error">{errorGlobal}</div>}

        {/* Conectamos el form con hook form */}
        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          
          <div className="form-grupo">
            <label>Usuario</label>
            {/* Usamos {...register para guardar el input por id */}
            <input type="text" {...register("username")} />
            {/* Mostramos el error si Zod detecta algo */}
            {errors.username && <span className="error-text">{errors.username.message}</span>}
          </div>

          {/* Si islogin es false mostramos el div que hay a continuación, es decir, si está sign in muestra esto */}
          {!isLogin && (
            <>
              <div className="form-grupo">
                <label>Correo Electrónico</label>
                <input type="email" {...register("email")} />
                {errors.email && <span className="error-text">{errors.email.message}</span>}
              </div>
              <div className="form-grupo">
                <label>Carnet de Identidad (CI)</label>
                <input type="text" {...register("ci")} />
                {errors.ci && <span className="error-text">{errors.ci.message}</span>}
              </div>
            </>
          )}

          {/* Para la input del password */}
          <div className="form-grupo">
            <label>Contraseña</label>
            <PasswordInput 
              register={register} 
              name="password" 
              error={errors.password} 
            />
          </div>
          
          {/* Si está registrando un usuario */}
          {!isLogin && (
            <div className="form-grupo">
              <label>Confirmar Contraseña</label>
              <PasswordInput 
                register={register} 
                name="confirmPassword" 
                error={errors.confirmPassword} 
              />
            </div>
          )}

          <button type="submit" className="btn-login" disabled={cargando}>
            {cargando ? "Procesando..." : (isLogin ? "Iniciar Sesión" : "Registrarse")}
          </button>
        </form>

        <div className="login-footer">
          <button className="btn-toggle" onClick={toggleMode}>
            {isLogin ? "¿No tienes cuenta? Regístrate aquí" : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>
    </div>
  );
}