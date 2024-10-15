import { Router } from "express";
import { VehicleController } from "../controllers/vehicle.controller";
import Vehicle from "../models/vehicle.model";
import { PostgresVehicleRepository } from "../repositories/vehicle.repository";
import { VehicleService } from "../services/vehicle.service";

const router: Router = Router()

const controller = new VehicleController(new VehicleService(new PostgresVehicleRepository(Vehicle)));

router.get('/', controller.findAll);

router.get('/:vehicleId', controller.findById);

router.post('/', controller.create);

router.delete('/:vehicleId', controller.delete);

router.patch('/:vehicleId', controller.update);

export default router;