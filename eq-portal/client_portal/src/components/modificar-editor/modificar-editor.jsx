import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import "./modificar-editor.css";

const schemaEditor = z.object({
  ci: z.string().min(1, "El CI es obligatorio"),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellido: z.string().min(1, "El apellido es obligatorio"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export default function ModificarEditor({ onGuardar, onCancelar, itemEditando }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schemaEditor),
  });

  // Efecto para cargar los datos del editor cuando se abre la ventana
  useEffect(() => {
    if (itemEditando) {
      reset({
        ci: itemEditando.ci || "",
        nombre: itemEditando.first_name || itemEditando.nombre || "", 
        apellido: itemEditando.last_name || itemEditando.apellido || "",
        password: "", // Vacío por seguridad
      });
    }
  }, [itemEditando, reset]);

  const onSubmit = async (data) => {
    const exito = await onGuardar(data);
    if (exito) {
      reset();
    }
  };

  return (
    <form className="form-editor" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-grupo">
        <label>CI:</label>
        {/* El CI normalmente no se modifica, por eso el readOnly */}
        <input type="text" {...register("ci")} readOnly />
        {errors.ci && <span className="error-message">{errors.ci.message}</span>}
      </div>

      <div className="form-grupo">
        <label>Nombre:</label>
        <input type="text" {...register("nombre")} />
        {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
      </div>

      <div className="form-grupo">
        <label>Apellido:</label>
        <input type="text" {...register("apellido")} />
        {errors.apellido && <span className="error-message">{errors.apellido.message}</span>}
      </div>

      <div className="form-grupo">
        <label>Nueva Contraseña:</label>
        <input type="password" {...register("password")} placeholder="Deje en blanco para no cambiarla" />
        {errors.password && <span className="error-message">{errors.password.message}</span>}
      </div>

      <div className="modal-botones">
        <button type="submit" className="btn-guardar">Guardar Cambios</button>
        <button type="button" className="btn-cancelar" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
}