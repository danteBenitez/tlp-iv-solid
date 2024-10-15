import { IVehicleRepository } from "../interfaces/vehicle-repository.interface";
import { IVehicle } from "../interfaces/vehicle.interface";
import Vehicle from "../models/vehicle.model";

export class PostgresVehicleRepository implements IVehicleRepository {
    constructor(private vehicleModel: typeof Vehicle) { }

    create(vehicle: Omit<IVehicle, "id">): Promise<IVehicle> {
        return this.vehicleModel.create(vehicle);
    }

    findById(id: string): Promise<IVehicle | null> {
        return this.vehicleModel.findByPk(id);
    }

    async update(vehicle: IVehicle): Promise<IVehicle | null> {
        const [affected, vehicleUpdated] = await this.vehicleModel.update(vehicle, {
            where: {
                id: vehicle.id
            },
            returning: ["id", "make", "model", "price", "year"]
        });

        if (affected <= 0) {
            return null;
        }

        return vehicleUpdated[0];
    }

    async delete(id: string): Promise<IVehicle | null> {
        const found = await this.vehicleModel.findByPk(id);
        if (!found) {
            return null;
        }

        found.destroy();
        return found;
    }
}