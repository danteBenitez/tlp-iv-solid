import { config } from "../config/config.service";
import { IClientRepository } from "../interfaces/client-repository.interface";
import { IVehicleRepository } from "../interfaces/vehicle-repository.interface";
import { ClientModel } from "../models/mongo/client.model";
import { VehicleModel } from "../models/mongo/vehicle.model";
import Client from "../models/postgres/client.model";
import Vehicle from "../models/postgres/vehicle.model";
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