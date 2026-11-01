import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaEvento } from "../../schemas/contentSchema";
import { useState, useEffect } from "react";

export default function EventoForm({ onGuardar }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schemaEvento),
  });

  const [itemEditando, setItemEditando] = useState(null);

  // Efecto para cargar los datos cuando se selecciona un evento para editar
  useEffect(() => {
    if (itemEditando) {
      reset({
        titulo: itemEditando.titulo,
        fecha_evento: itemEditando.fecha_evento,
        lugar: itemEditando.lugar,
        objetivo: itemEditando.objetivo,
      });
    } else {
      reset({ titulo: "", fecha_evento: "", lugar: "", objetivo: "" });
    }
  }, [itemEditando, reset]);

  const onSubmit = async (data) => {
    const exito = await onGuardar(data);
    if (exito) reset();
  };

  return (
    <section className="dashboard-card">
      <h2>Crear Nuevo Evento</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="form-group">
          <label>Título del Evento</label>
          <input type="text" {...register("titulo")} className="form-control" />
          {errors.titulo && <span className="error-text">{errors.titulo.message}</span>}
        </div>

        <div className="form-group">
          <label>Fecha del Evento</label>
          <input type="date" {...register("fecha_evento")} className="form-control" />
          {errors.fecha_evento && <span className="error-text">{errors.fecha_evento.message}</span>}
        </div>

        <div className="form-group">
          <label>Lugar</label>
          <input type="text" {...register("lugar")} className="form-control" />
          {errors.lugar && <span className="error-text">{errors.lugar.message}</span>}
        </div>

        <div className="form-group">
          <label>Objetivo</label>
          <textarea {...register("objetivo")} className="form-control" rows="3"></textarea>
          {errors.objetivo && <span className="error-text">{errors.objetivo.message}</span>}
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-success">
            {itemEditando ? "Guardar Cambios" : "Crear Evento"}
          </button>
          {itemEditando && (
            <button type="button" onClick={onCancelar} className="btn-outline">
              Cancelar
            </button>
          )}
        </div>

      </form>
    </section>
  );
}