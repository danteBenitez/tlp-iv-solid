import { Router } from "express";
import { ClientController } from "../controllers/client.controller";
import { RepositoryFactory } from "../repositories/repository.factory";
import { ClientService } from "../services/client.service";

const router: Router = Router()

const controller = new ClientController(new ClientService(RepositoryFactory.getClientRepository()));

router.get('/', controller.findAll);

router.get('/:clientId', controller.findById);

router.post('/', controller.create);

router.delete('/:clientId', controller.delete);

router.patch('/:clientId', controller.update);

export default router;