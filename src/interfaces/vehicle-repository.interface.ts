import { IVehicle } from "../models/vehicle.interface";

export interface IVehicleRepository {
    create(client: Omit<IVehicle, "id">): Promise<IVehicle>;
    findAll(): Promise<IVehicle[]>;
    findById(id: string): Promise<IVehicle | null>;
    update(client: Partial<IVehicle>): Promise<IVehicle | null>;
    delete(id: string): Promise<IVehicle | null>;
}