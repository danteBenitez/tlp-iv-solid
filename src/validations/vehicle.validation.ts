import { z } from "zod";
import { IVehicle } from "../interfaces/vehicle.interface";

export const createVehicleSchema = z.object({
    make: z.string().min(1, {
        message: "La marca del vehículo es requerida",
    }),
    year: z.number().refine(year => year <= new Date().getFullYear(), {
        path: ["year"],
        message: "El año no puede ser futuro"
    }),
    model: z.string().min(1, {
        message: "La marca del vehículo es requerida",
    }).max(255, {
        message: "La marca del vehículo debe tener como máximo 255 caracteres"
    }),
    price: z.number().min(0.1, {
        message: "El precio debe ser positivo"
    })
});

createVehicleSchema._output satisfies Omit<IVehicle, "id">;

export const vehicleIdSchema = z.object({
    params: z.object({ vehicleId: z.string() })
})

export const updateVehicleSchema = z.object({
    body: createVehicleSchema.partial(),
}).and(vehicleIdSchema);