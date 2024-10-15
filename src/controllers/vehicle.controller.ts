import { Request, Response } from "express";
import { VehicleService } from "../services/vehicle.service";
import { validateRequest, validateRequestBody } from "../validations/validation-adapter";
import { createVehicleSchema, updateVehicleSchema, vehicleIdSchema } from "../validations/vehicle.schema";

export class VehicleController {

    constructor(private service: VehicleService) { }

    findById = async (req: Request, res: Response) => {
        const data = await validateRequest(req, vehicleIdSchema);
        const client = await this.service.findOne(data.params.vehicleId.toString());
        if (!client) {
            return res.status(404).json({
                message: "No fue posible encontrar el vehículo"
            });
        }
        return res.status(200).json(client);
    }


    create = async (req: Request, res: Response) => {
        const data = await validateRequestBody(req, createVehicleSchema);
        const client = await this.service.create(data);
        res.status(201).json(client);
    }

    update = async (req: Request, res: Response) => {
        const data = await validateRequest(req, updateVehicleSchema);
        const client = await this.service.update({ id: data.params.vehicleId.toString(), ...data.body });
        if (!client) {
            return res.status(404).json({
                message: "No fue posible encontrar el vehículo"
            })
        }
        res.status(200).json(client);
    }

    delete = async (req: Request, res: Response) => {
        const data = await validateRequest(req, vehicleIdSchema);
        const client = await this.service.delete(data.params.vehicleId.toString());
        if (!client) {
            return res.status(404).json({
                message: "No fue posible encontrar el vehículo"
            })
        }
        res.status(200).json(client);
    }
}