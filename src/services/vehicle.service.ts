import { IVehicleRepository } from "../interfaces/vehicle-repository.interface";
import { IVehicle } from "../interfaces/vehicle.interface";

export class VehicleService {

    constructor(protected repository: IVehicleRepository) { }

    async findAll(): Promise<IVehicle[]> {
        return this.repository.findAll();
    }

    async findOne(id: string): Promise<IVehicle | null> {
        return this.repository.findById(id);
    }

    async create(client: Omit<IVehicle, "id">): Promise<IVehicle | null> {
        return this.repository.create(client);
    }

    async update(client: Partial<IVehicle>): Promise<IVehicle | null> {
        return this.repository.update(client);
    }

    async delete(id: string): Promise<IVehicle | null> {
        return this.repository.delete(id);
    }
}

/**
 * Sobreescribimos el comportamiento actual, incluyendo un cálculo 
 * de descuento antes de retornar el vehículo
 */
const DEFAULT_DISCOUNT = 0.02;
export class VehicleWithDiscountService extends VehicleService {
    constructor(
        repository: IVehicleRepository,
        private discountPercentage: number = DEFAULT_DISCOUNT
    ) {
        super(repository);
    }

    async withDiscount(v: IVehicle) {
        v.price = v.price - v.price * this.discountPercentage;
        return v;
    }

    async findOne(id: string) {
        const vehicle = await super.findOne(id);
        if (!vehicle) return null;
        return this.withDiscount(vehicle);
    }

    async findAll() {
        const vehicles = await super.findAll();
        return Promise.all(vehicles.map(v => {
            return this.withDiscount(v);
        }));
    }

    async update(client: Partial<IVehicle>): Promise<IVehicle | null> {
        const vehicle = await super.update(client);
        if (!vehicle) return null;
        return this.withDiscount(vehicle);
    }

    async delete(id: string): Promise<IVehicle | null> {
        const vehicle = await super.delete(id);
        if (!vehicle) return null;
        return this.withDiscount(vehicle);
    }
}