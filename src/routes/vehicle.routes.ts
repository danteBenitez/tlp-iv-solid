import { Router } from "express";
import { VehicleController } from "../controllers/vehicle.controller";
import { MongoVehicleRepository } from "../repositories/vehicle.repository";
import { VehicleModel } from "../schemas/vehicle.schema";
import { VehicleService } from "../services/vehicle.service";

const router: Router = Router()

const controller = new VehicleController(new VehicleService(new MongoVehicleRepository(VehicleModel)));

router.get('/:vehicleId', controller.findById);

router.post('/', controller.create);

router.delete('/:vehicleId', controller.delete);

router.patch('/:vehicleId', controller.update);

export default router;