import { Request, Response } from "express";
import { VehicleService } from "../services/vehicle.service";
import { validateRequest, validateRequestBody } from "../validations/validation-adapter";
import { createVehicleSchema, updateVehicleSchema, vehicleIdSchema } from "../validations/vehicle.schema";

export class VehicleController {

    constructor(private service: VehicleService) { }

    findAll = async (req: Request, res: Response) => {
        const vehicles = await this.service.findAll();
        if (vehicles.length === 0) {
            return res.status(404).json({
                message: "No existe ningún vehículo"
            });
        }
        return res.status(200).json(vehicles);
    }

    findById = async (req: Request, res: Response) => {
        const data = await validateRequest(req, vehicleIdSchema);
        const vehicle = await this.service.findOne(data.params.vehicleId.toString());
        if (!vehicle) {
            return res.status(404).json({
                message: "No fue posible encontrar el vehículo"
            });
        }
        return res.status(200).json(vehicle);
    }


    create = async (req: Request, res: Response) => {
        const data = await validateRequestBody(req, createVehicleSchema);
        const vehicle = await this.service.create(data);
        res.status(201).json(vehicle);
    }

    update = async (req: Request, res: Response) => {
        const data = await validateRequest(req, updateVehicleSchema);
        const vehicle = await this.service.update({ id: data.params.vehicleId.toString(), ...data.body });
        if (!vehicle) {
            return res.status(404).json({
                message: "No fue posible encontrar el vehículo"
            })
        }
        res.status(200).json(vehicle);
    }

    delete = async (req: Request, res: Response) => {
        const data = await validateRequest(req, vehicleIdSchema);
        const vehicle = await this.service.delete(data.params.vehicleId.toString());
        if (!vehicle) {
            return res.status(404).json({
                message: "No fue posible encontrar el vehículo"
            })
        }
        res.status(200).json(vehicle);
    }
}