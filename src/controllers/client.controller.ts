import { Request, Response } from "express";
import { ClientService } from "../services/client.service";
import { clientIdSchema, createClientSchema, updateClientSchema } from "../validations/client.validation";
import { validateRequest, validateRequestBody } from "../validations/validation-adapter";

export class ClientController {

    constructor(private service: ClientService) { }

    findAll = async (req: Request, res: Response) => {
        const clients = await this.service.findAll();
        if (clients.length === 0) {
            return res.status(404).json({
                message: "No existe ningún cliente"
            });
        }
        return res.status(200).json(clients);
    }

    findById = async (req: Request, res: Response) => {
        const data = await validateRequest(req, clientIdSchema);
        const client = await this.service.findOne(data.params.clientId.toString());
        if (!client) {
            return res.status(404).json({
                message: "No fue posible encontrar el cliente"
            });
        }
        return res.status(200).json(client);
    }


    create = async (req: Request, res: Response) => {
        const data = await validateRequestBody(req, createClientSchema);
        const client = await this.service.create(data);
        res.status(201).json(client);
    }

    update = async (req: Request, res: Response) => {
        const data = await validateRequest(req, updateClientSchema);
        const client = await this.service.update({ id: data.params.clientId.toString(), ...data.body });
        if (!client) {
            return res.status(404).json({
                message: "No fue posible encontrar el cliente"
            })
        }
        res.status(200).json(client);
    }

    delete = async (req: Request, res: Response) => {
        const data = await validateRequest(req, clientIdSchema);
        const client = await this.service.delete(data.params.clientId.toString());
        if (!client) {
            return res.status(404).json({
                message: "No fue posible encontrar el cliente"
            })
        }
        res.status(200).json(client);
    }
}