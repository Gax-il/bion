import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: "Neplatný email",
    })
    .max(64, {
      message: "Email je příliš dlouhý",
    }),
  password: z
    .string()
    .min(1, {
      message: "Heslo je prázdné",
    })
    .max(128, {
      message: "Heslo je příliš dlouhé",
    }),
});
