import { IVehicle } from "./vehicle.interface";

export interface IVehicleRepository {
    create(client: Omit<IVehicle, "id">): Promise<IVehicle>;
    findById(id: string): Promise<IVehicle | null>;
    update(client: Partial<IVehicle>): Promise<IVehicle | null>;
    delete(id: string): Promise<IVehicle | null>;
}