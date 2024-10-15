import { Router } from "express";
import { ClientController } from "../controllers/client.controller";
import Client from "../models/client.model";
import { PostgresClientRepository } from "../repositories/client.repository";
import { ClientService } from "../services/client.service";

const router: Router = Router()

const controller = new ClientController(new ClientService(new PostgresClientRepository(Client)));

router.get('/:clientId', controller.findById);

router.post('/', controller.create);

router.delete('/:clientId', controller.delete);

router.patch('/:clientId', controller.update);

export default router;