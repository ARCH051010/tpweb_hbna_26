import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  nombre: z.string().min(3, "Nombre obligatorio"),
  correo: z.string().email("Correo inválido"),
  cargo: z.string().min(3, "Cargo obligatorio"),
});

export default function ConsejoForm({ onGuardar, itemEditando }) {
  const [foto, setFoto] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: itemEditando || {}
  });

  const submit = (data) => {
    onGuardar(data, foto);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="form-group">
        <label>Nombre Completo</label>
        <input type="text" {...register("nombre")} className="form-control" />
        {errors.nombre && <span className="error-text">{errors.nombre.message}</span>}
      </div>
      <div className="form-group">
        <label>Cargo</label>
        <input type="text" {...register("cargo")} className="form-control" />
        {errors.cargo && <span className="error-text">{errors.cargo.message}</span>}
      </div>
      <div className="form-group">
        <label>Correo</label>
        <input type="email" {...register("correo")} className="form-control" />
        {errors.correo && <span className="error-text">{errors.correo.message}</span>}
      </div>
      <div className="form-group">
        <label>Foto de Perfil</label>
        <input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files[0])} className="form-control" />
      </div>
      <button type="submit" className="btn-success" style={{ marginTop: '1rem' }}>
        {itemEditando ? "Guardar Cambios" : "Agregar Miembro"}
      </button>
    </form>
  );
}