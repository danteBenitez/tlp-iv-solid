import { IVehicleRepository } from "../interfaces/vehicle-repository.interface";
import { IVehicle } from "../interfaces/vehicle.interface";

export class VehicleService {

    constructor(private repository: IVehicleRepository) { }

    async findOne(id: string): Promise<IVehicle | null> {
        return this.repository.findById(id);
    }

    async create(client: Omit<IVehicle, "id">): Promise<IVehicle | null> {
        return this.repository.create(client);
    }

    async update(client: IVehicle): Promise<IVehicle | null> {
        return this.repository.update(client);
    }

    async delete(id: string): Promise<IVehicle | null> {
        return this.repository.delete(id);
    }
}