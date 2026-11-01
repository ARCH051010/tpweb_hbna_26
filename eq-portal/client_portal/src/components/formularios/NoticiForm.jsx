import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaNoticia } from "../../schemas/contentSchema";
import { useEffect } from "react";

export default function NoticiaForm({ onGuardar, itemEditando }) {
  const [imagenFile, setImagenFile] = useState(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schemaNoticia),
  });

  useEffect(() => {
    if (itemEditando) {
      // MODO EDICIÓN: Llenamos los campos de texto con los datos del registro
      reset({
        titulo: itemEditando.titulo,
        contenido: itemEditando.contenido,
        fecha: itemEditando.fecha, // Asegúrate de que el formato de fecha coincida (Y-M-D)
      });
    } else {
      // MODO CREACIÓN: Limpiamos el formulario
      reset({ titulo: "", contenido: "", fecha: "" });
    }
  }, [itemEditando, reset]);

  const onSubmit = async (data) => {
    const exito = await onGuardar(data, imagenFile);
    if (exito) {
      reset();
      setImagenFile(null); // Limpiar el input file
    }
  };

  return (
    <section className="dashboard-card">
      <h2>Publicar Nueva Noticia</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Título</label>
          <input type="text" {...register("titulo")} className="form-control" />
          {errors.titulo && <span className="error-text">{errors.titulo.message}</span>}
        </div>
        <div className="form-group">
          <label>Fecha</label>
          <input type="date" {...register("fecha")} className="form-control" />
          {errors.fecha && <span className="error-text">{errors.fecha.message}</span>}
        </div>
        <div className="form-group">
          <label>Imagen de Portada</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImagenFile(e.target.files[0])} 
            className="form-control" 
          />
        </div>
        <div className="form-group">
          <label>Contenido</label>
          <textarea {...register("contenido")} className="form-control" rows="4"></textarea>
          {errors.contenido && <span className="error-text">{errors.contenido.message}</span>}
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-success">Publicar Noticia</button>
        </div>
      </form>
    </section>
  );
}