import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import "./feu-form.css";


const schemaFEU = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  apellidos: z.string().min(1, "Los apellidos son obligatorios"),
  ano_escolar: z.string().min(1, "El año académico es obligatorio"),
  edad: z.string().min(1, "La edad es obligatoria").refine((val) => parseInt(val) > 0 && parseInt(val) < 30, "La edad debe ser entre 1 y 29"),
  cargo: z.string().min(1, "El cargo es obligatorio"),
  biografia: z.string().min(1, "La biografía es obligatoria"),
});

export default function FeuForm({ onGuardar, onCancelar, itemEditando }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schemaFEU),
  });

  // Si estamos editando, llenamos los campos con los datos actuales
  useEffect(() => {
    if (itemEditando) {
      reset({
        nombre: itemEditando.nombre || "",
        apellidos: itemEditando.apellidos || "",
        ano_escolar: itemEditando.ano_escolar?.toString() || "",
        edad: itemEditando.edad?.toString() || "",
        cargo: itemEditando.cargo || "",
        biografia: itemEditando.biografia || "",
      });
    }
  }, [itemEditando, reset]);

  const onSubmit = async (data) => {
    // Convertimos los números a enteros antes de enviar
    const datosLimpios = {
      ...data,
      ano_escolar: parseInt(data.ano_escolar),
      edad: parseInt(data.edad)
    };
    const exito = await onGuardar(datosLimpios);
    if (exito) reset();
  };

  return (
    <form className="form-feu" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-grupo">
        <label>Nombre:</label>
        <input type="text" {...register("nombre")} />
        {errors.nombre && <span className="error-message">{errors.nombre.message}</span>}
      </div>
      <div className="form-grupo">
        <label>Apellidos:</label>
        <input type="text" {...register("apellidos")} />
        {errors.apellidos && <span className="error-message">{errors.apellidos.message}</span>}
      </div>
      <div className="form-grupo">
        <label>Año Académico:</label>
        <input type="number" {...register("ano_escolar")} />
        {errors.ano_escolar && <span className="error-message">{errors.ano_escolar.message}</span>}
      </div>
      <div className="form-grupo">
        <label>Edad:</label>
        <input type="number" {...register("edad")} />
        {errors.edad && <span className="error-message">{errors.edad.message}</span>}
      </div>
      <div className="form-grupo">
        <label>Cargo:</label>
        <input type="text" {...register("cargo")} />
        {errors.cargo && <span className="error-message">{errors.cargo.message}</span>}
      </div>
      <div className="form-grupo">
        <label>Biografía:</label>
        <textarea {...register("biografia")} rows="3" />
        {errors.biografia && <span className="error-message">{errors.biografia.message}</span>}
      </div>
      <div className="modal-botones">
        <button type="submit" className="btn-guardar">Guardar</button>
        <button type="button" className="btn-cancelar" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
}