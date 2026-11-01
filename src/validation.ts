import { z } from "zod";
import { careers, faculties, inCampus, normalize } from "./model";
import type { Category } from "./model";

const text = (message: string, max: number) =>
  z
    .string()
    .trim()
    .min(1, message)
    .max(max, `No puede superar los ${max} caracteres.`);
const category = (categories: Category[]) =>
  z
    .string()
    .refine(
      (id) => categories.some((item) => item.id === id),
      "Selecciona una categoría válida.",
    );
const location = {
  name: text("Debe introducir el nombre de la localización.", 100),
  description: text("Debe introducir la descripción de la localización.", 2000),
  lat: z.string(),
  lng: z.string(),
};
function validLocation(value: { lat: string; lng: string }) {
  return (
    Boolean(value.lat.trim() && value.lng.trim()) &&
    Number.isFinite(Number(value.lat)) &&
    Number.isFinite(Number(value.lng)) &&
    inCampus([Number(value.lat), Number(value.lng)])
  );
}
const locationError = {
  message: "Selecciona un punto válido dentro del campus.",
  path: ["lat"],
};

export const eventSchema = (categories: Category[]) =>
  z
    .object({
      ...location,
      name: text("Debe introducir el nombre del evento.", 100),
      description: text("Debe introducir la descripción del evento.", 2000),
      category: category(categories),
      organizer: text("Debe introducir el organizador.", 120),
      place: z.string().trim().max(200),
      start: z
        .string()
        .refine(
          (value) => Number.isFinite(Date.parse(value)),
          "Selecciona una fecha y hora de inicio válida.",
        ),
      end: z
        .string()
        .refine(
          (value) => Number.isFinite(Date.parse(value)),
          "Selecciona una fecha y hora de finalización válida.",
        ),
      faculty: z.enum(["Todas las facultades", ...faculties]),
      career: z.enum(["Todas las carreras", ...careers]),
    })
    .refine(validLocation, locationError)
    .refine((value) => new Date(value.end) > new Date(value.start), {
      message: "La finalización debe ser posterior al inicio.",
      path: ["end"],
    });
export type EventValues = z.infer<ReturnType<typeof eventSchema>>;

export const requestSchema = (categories: Category[]) =>
  z
    .object({
      ...location,
      category: category(categories),
      reason: text("Debe introducir la razón de la solicitud.", 1000),
    })
    .refine(validLocation, locationError);
export type RequestValues = z.infer<ReturnType<typeof requestSchema>>;

export const locationSchema = (categories: Category[]) =>
  z
    .object({
      ...location,
      category: category(categories),
      address: z.string().trim().max(150),
      official: z.boolean(),
    })
    .refine(validLocation, locationError);
export type LocationValues = z.infer<ReturnType<typeof locationSchema>>;

export const categorySchema = (categories: Category[], currentId?: string) =>
  z.object({
    name: text("Debe introducir el nombre de la categoría.", 80).refine(
      (name) =>
        !categories.some(
          (item) =>
            item.id !== currentId && normalize(item.name) === normalize(name),
        ),
      "Ya existe una categoría con este nombre.",
    ),
    description: text("Debe introducir la descripción de la categoría.", 500),
  });
export type CategoryValues = z.infer<ReturnType<typeof categorySchema>>;

export const commentSchema = z.object({
  text: text("Debe escribir un comentario.", 1000),
});
export const reportSchema = z.object({
  reason: text("Debe introducir el motivo de la denuncia.", 1000),
});
export const loginSchema = z.object({
  email: z.string().trim().email("Introduce un correo válido."),
  password: z.string().min(1, "Introduce la contraseña de demostración."),
});
export const userActionSchema = (blocking: boolean) =>
  z.object({
    reason: blocking
      ? text("Introduce la razón de la suspensión.", 500)
      : z.string().trim().max(500),
  });
export const decisionSchema = (rejecting: boolean) =>
  z.object({
    reason: rejecting
      ? text("Introduce un motivo para rechazar la solicitud.", 1000)
      : z.string().trim().max(1000),
    official: z.boolean(),
  });

export const routeSchema = (origins: string[], destinations: string[]) =>
  z.object({
    origin: z
      .string()
      .refine(
        (value) => value === "my-position" || origins.includes(value),
        "Selecciona un punto de partida válido.",
      ),
    destination: z
      .string()
      .refine(
        (value) => destinations.includes(value),
        "Selecciona un destino válido.",
      ),
  });
