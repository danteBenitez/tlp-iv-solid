import { IVehicleRepository } from "../interfaces/vehicle-repository.interface";
import { IVehicle } from "../interfaces/vehicle.interface";
import Vehicle from "../models/vehicle.model";
import { VehicleModel } from "../schemas/vehicle.schema";
import { parseIntegerId } from "../utils/parse-integer-id";

export class PostgresVehicleRepository implements IVehicleRepository {
    constructor(private vehicleModel: typeof Vehicle) { }

    create(vehicle: Omit<IVehicle, "id">): Promise<IVehicle> {
        return this.vehicleModel.create(vehicle);
    }

    async findById(id: string): Promise<IVehicle | null> {
        const parsed = parseIntegerId(id);
        if (!parsed) return null;
        return this.vehicleModel.findByPk(parsed);
    }

    async update(vehicle: IVehicle): Promise<IVehicle | null> {
        const parsed = parseIntegerId(vehicle.id);
        if (!parsed) return null;
        const [affected, vehicleUpdated] = await this.vehicleModel.update(vehicle, {
            where: {
                id: parsed
            },
            returning: ["id", "make", "model", "price", "year"]
        });

        if (affected <= 0) {
            return null;
        }

        return vehicleUpdated[0];
    }

    async delete(id: string): Promise<IVehicle | null> {
        const parsed = parseIntegerId(id);
        if (!parsed) return null;
        const found = await this.vehicleModel.findByPk(parsed);
        if (!found) {
            return null;
        }

        found.destroy();
        return found;
    }
}

export class MongoVehicleRepository implements IVehicleRepository {
    constructor(private vehicleModel: typeof VehicleModel) { }

    async create(client: Omit<IVehicle, "id">): Promise<IVehicle> {
        return this.vehicleModel.create(client);
    }

    async update(client: Partial<IVehicle> & { id: string; }): Promise<IVehicle | null> {
        const found = await this.vehicleModel.findOneAndUpdate({ _id: client.id }, client, {
            new: true
        });

        if (!found) {
            return null;
        }

        return found;
    }

    findById(id: string): Promise<IVehicle | null> {
        return this.vehicleModel.findById(id);
    }

    async delete(id: string): Promise<IVehicle | null> {
        const client = await this.vehicleModel.findOne({ _id: id });
        if (!client) return null;
        client.deleteOne();
        return client;
    }
}