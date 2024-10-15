import { config } from "../config/config.service";
import { IClientRepository } from "../interfaces/client-repository.interface";
import { IVehicleRepository } from "../interfaces/vehicle-repository.interface";
import Client from "../models/client.model";
import Vehicle from "../models/vehicle.model";
import { ClientModel } from "../schemas/client.schema";
import { VehicleModel } from "../schemas/vehicle.schema";
import { MongoClientRepository, PostgresClientRepository } from "./client.repository";
import { MongoVehicleRepository, PostgresVehicleRepository } from "./vehicle.repository";

export class RepositoryFactory {

    static getClientRepository(): IClientRepository {
        const dialect = config.getDatabaseOptions().DIALECT;
        if (dialect == "postgres") {
            return new PostgresClientRepository(Client);
        } else {
            return new MongoClientRepository(ClientModel);
        }
    }

    static getVehicleRepository(): IVehicleRepository {
        const dialect = config.getDatabaseOptions().DIALECT;
        if (dialect == "postgres") {
            return new PostgresVehicleRepository(Vehicle);
        } else {
            return new MongoVehicleRepository(VehicleModel);
        }
    }

}