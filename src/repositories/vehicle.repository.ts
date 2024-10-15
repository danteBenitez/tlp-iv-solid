import { IVehicleRepository } from "../interfaces/vehicle-repository.interface";
import { IVehicle } from "../interfaces/vehicle.interface";
import { VehicleModel } from "../models/mongo/vehicle.model";
import Vehicle from "../models/postgres/vehicle.model.js";
import { parseIntegerId } from "../utils/parse-integer-id";
import { parseObjectId } from "../utils/parse-object-id";

export class PostgresVehicleRepository implements IVehicleRepository {
    constructor(private vehicleModel: typeof Vehicle) { }

    create(vehicle: Omit<IVehicle, "id">): Promise<IVehicle> {
        return this.vehicleModel.create(vehicle);
    }

    findAll(): Promise<IVehicle[]> {
        return this.vehicleModel.findAll();
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

    findAll(): Promise<IVehicle[]> {
        return this.vehicleModel.find();
    }

    async update(client: Partial<IVehicle> & { id: string; }): Promise<IVehicle | null> {
        const parsed = parseObjectId(client.id);
        if (!parsed) return null
        const found = await this.vehicleModel.findOneAndUpdate({ _id: parsed }, client, {
            new: true
        });

        if (!found) {
            return null;
        }

        return found;
    }

    async findById(id: string): Promise<IVehicle | null> {
        const parsed = parseObjectId(id);
        if (!parsed) return null
        return this.vehicleModel.findById(id);
    }

    async delete(id: string): Promise<IVehicle | null> {
        const parsed = parseObjectId(id);
        if (!parsed) return null
        const vehicle = await this.vehicleModel.findOne({ _id: parsed });
        if (!vehicle) return null;
        await vehicle.deleteOne();
        return vehicle;
    }
}