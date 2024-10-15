import { config } from "../config/config.service";
import { IClientRepository } from "../interfaces/client-repository.interface";
import { IVehicleRepository } from "../interfaces/vehicle-repository.interface";
import { MongoClientRepository, PostgresClientRepository } from "./client.repository";
import { MongoVehicleRepository, PostgresVehicleRepository } from "./vehicle.repository";

export class RepositoryFactory {

    static getClientRepository(): IClientRepository {
        const dialect = config.getDatabaseOptions().DIALECT;
        if (dialect == "postgres") {
            return new PostgresClientRepository();
        } else {
            return new MongoClientRepository();
        }
    }

    static getVehicleRepository(): IVehicleRepository {
        const dialect = config.getDatabaseOptions().DIALECT;
        if (dialect == "postgres") {
            return new PostgresVehicleRepository();
        } else {
            return new MongoVehicleRepository();
        }
    }

}