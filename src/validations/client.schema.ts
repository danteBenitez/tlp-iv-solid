import { z } from "zod";
import { IClient } from "../interfaces/client.interface";

export const createClientSchema = z.object({
    name: z.string().min(1, {
        message: "El nombre debe tener al menos un caracter"
    }).max(255, {
        message: "El nombre debe tener hasta 255 caracteres"
    }).regex(/^[a-zA-Záéíóú '-]+$/, {
        message: "El nombre sólo puede contener caracteres alfanuméricos, guiones, espacios y apóstrofos"
    }),
    email: z.string().min(1, {
        message: "El email debe tener al menos un caracter"
    }).max(255, {
        message: "El nombre debe tener hasta 255 caracteres"
    }).email({
        message: "Email inválido"
    }),
    phone_number: z.number().min(8, {
        message: "El número de teléfono al menos ocho caracteres"
    })
});

createClientSchema._output satisfies Omit<IClient, "id">;

export const clientIdSchema = z.object({
    params: z.object({ clientId: z.string() })
})

export const updateClientSchema = z.object({
    body: createClientSchema.partial(),
}).and(clientIdSchema);