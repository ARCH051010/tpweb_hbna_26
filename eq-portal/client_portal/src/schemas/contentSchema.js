// src/schemas/contentSchemas.js
import { z } from "zod";

export const schemaNoticia = z.object({
  titulo: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  contenido: z.string().min(20, "El contenido debe tener al menos 20 caracteres"),
  fecha: z.string().min(1, "La fecha es obligatoria"),
});

export const schemaEvento = z.object({
  titulo: z.string().min(5, "El título debe tener al menos 5 caracteres"),
  fecha_evento: z.string().min(1, "La fecha del evento es obligatoria"),
  lugar: z.string().min(3, "El lugar es obligatorio"),
  objetivo: z.string().min(10, "El objetivo debe tener al menos 10 caracteres"),
});