import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().min(3, "Mínimo 3 letras"),
  jefe: z.string().min(3, "El nombre del jefe es obligatorio"),
  descripcion: z.string().optional(),
});

export default function DepartamentoForm({ onGuardar, itemEditando }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: itemEditando || {}
  });

  return (
    <form onSubmit={handleSubmit(onGuardar)}>
      <div className="form-group">
        <label>Nombre del Departamento</label>
        <input type="text" {...register("nombre")} className="form-control" />
        {errors.nombre && <span className="error-text">{errors.nombre.message}</span>}
      </div>
      <div className="form-group">
        <label>Jefe del Departamento</label>
        <input type="text" {...register("jefe")} className="form-control" />
        {errors.jefe && <span className="error-text">{errors.jefe.message}</span>}
      </div>
      <div className="form-group">
        <label>Descripción (Opcional)</label>
        <textarea {...register("descripcion")} className="form-control" rows="3"></textarea>
      </div>
      <button type="submit" className="btn-success" style={{ marginTop: '1rem', width: "100%"}}>
        {itemEditando ? "Guardar Cambios" : "Crear Departamento"}
      </button>
    </form>
  );
}