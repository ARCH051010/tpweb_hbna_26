import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./registrar-editor.css";

// 1. Reglas de validación con Zod (Cumple los Criterios de Aceptación)
const schemaEditor = z.object({
  ci: z.string().min(1, "El CI es obligatorio"),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export default function RegistrarEditor({ onGuardar, onCancelar }) {
  // 2. Configuramos React Hook Form
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schemaEditor),
  });

  // 3. Función al presionar Guardar
  const onSubmit = async (data) => {
    // onGuardar es la función que tu jefe conectará a la base de datos
    const exito = await onGuardar(data); 
    if (exito) {
      reset(); // Limpia el formulario si todo salió bien
    }
  };

  return (
    <form className="form-editor" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-grupo">
        <label>CI:</label>
        <input type="text" {...register("ci")} placeholder="Ingrese el CI" />
        {/* Mostramos el error en rojo debajo del campo */}
        {errors.ci && <span className="error-message">{errors.ci.message}</span>}
      </div>

      <div className="form-grupo">
        <label>Nombre:</label>
        <input type="text" {...register("nombre")} placeholder="Ingrese el nombre" />
        {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
      </div>

      <div className="form-grupo">
        <label>Apellido:</label>
        <input type="text" {...register("apellido")} placeholder="Ingrese el apellido" />
        {errors.apellido && <span className="error-message">{errors.apellido.message}</span>}
      </div>

      <div className="form-grupo">
        <label>Contraseña:</label>
        <input type="password" {...register("password")} placeholder="Mínimo 8 caracteres" />
        {errors.password && <span className="error-message">{errors.password.message}</span>}
      </div>

      <div className="modal-botones">
        <button type="submit" className="btn-guardar">Registrar Editor</button>
        <button type="button" className="btn-cancelar" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
}