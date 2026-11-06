import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaRegistro } from "../../schemas/authSchemas"; 
import { useState, useEffect } from "react";

import PasswordInput from "../../pages/auth/PasswordInput"; 

export default function UsuarioForm({ vistaActual, onGuardar }) {
  const esEditor = vistaActual === 'editores';

  const [itemEditando, setItemEditando] = useState(null);

  // Configuramos React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schemaRegistro),
  });

  useEffect(() => {
    if (itemEditando) {
      // MODO EDICIÓN: Cargamos los datos del usuario, pero dejamos las contraseñas en blanco
      reset({
        username: itemEditando.username,
        email: itemEditando.email,
        ci: itemEditando.ci,
        password: "",
        confirmPassword: ""
      });
    } else {
      // MODO CREACIÓN: Limpiamos el formulario
      reset({ username: "", email: "", ci: "", password: "", confirmPassword: "" });
    }
  }, [itemEditando, reset]);

  // Esta función solo se ejecuta si Zod valida que todo está correcto
  const onSubmit = async (data) => {
    // Llamamos a la función del padre (Dashboard) y esperamos su respuesta
    const exito = await onGuardar(data); 

    // Extraemos confirmPassword para no enviarlo al backend
    const { confirmPassword, ...datosLimpios } = data;
    
    // Si el Dashboard devuelve 'true' (se guardó en la BD), limpiamos el formulario
    if (exito) {
      reset();
    }
  };

  return (
    <section className="dashboard-card">
      <h2>Registrar Nuevo {esEditor ? 'Editor' : 'Administrador'}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-group">
          <label>Nombre de Usuario</label>
          <input type="text" {...register("username")} className="form-control" />
          {errors.username && <span className="error-text">{errors.username.message}</span>}
        </div>

        <div className="form-group">
          <label>Correo Electrónico</label>
          <input type="email" {...register("email")} className="form-control" />
          {errors.email && <span className="error-text">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label>Carnet de Identidad (CI)</label>
          <input type="text" {...register("ci")} className="form-control" />
          {errors.ci && <span className="error-text">{errors.ci.message}</span>}
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <PasswordInput 
            register={register} 
            name="password" 
            error={errors.password} 
          />
        </div>

        <div className="form-group">
          <label>Confirmar Contraseña</label>
          <PasswordInput 
            register={register} 
            name="confirmPassword" 
            error={errors.confirmPassword} 
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-success">
            Registrar {esEditor ? 'Editor' : 'Admin'}
          </button>
        </div>
        
      </form>
    </section>
  );
}