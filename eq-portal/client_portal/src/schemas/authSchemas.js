import { z } from "zod";

// Esquema para el Login 
export const schemaLogin = z.object({
  username: z.string().min(1, "El usuario es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

// Esquema para el Registro y sus validaciones
export const schemaRegistro = z.object({
  username: z.string().min(3, "El usuario debe tener al menos 3 letras"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  ci: z.string().length(11, "El CI debe tener exactamente 11 dígitos"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  confirmPassword: z.string().min(8, "Debes confirmar la contraseña"),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"], // Esto hace que el error aparezca en el input de confirmación
});
