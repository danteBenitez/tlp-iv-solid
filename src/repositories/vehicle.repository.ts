import { IVehicleRepository } from "../interfaces/vehicle-repository.interface";
import { IVehicle } from "../interfaces/vehicle.interface";

export class PostgresVehicleRepository implements IVehicleRepository {
    private vehicles: IVehicle[] = [
        {
            id: "1",
            make: "Toyota",
            model: "Corolla",
            year: 2019,
            price: 890.0
        },
        {
            id: "2",
            make: "Renault",
            model: "Vectra",
            year: 2018,
            price: 98.0
        }
    ];

    constructor() {
        console.log("Construyendo repositorio de vehículos (postgres)");
    }

    async create(vehicle: Omit<IVehicle, "id">): Promise<IVehicle> {
        const lastId = parseInt(this.vehicles.at(-1)?.id ?? '0');
        this.vehicles.push({ id: (lastId + 1).toString(), ...vehicle });
        return this.vehicles.at(-1)!;
    }

    async findAll(): Promise<IVehicle[]> {
        return this.vehicles;
    }

    async findById(id: string): Promise<IVehicle | null> {
        return this.vehicles.find(c => c.id == id) ?? null;
    }

    async update(vehicle: IVehicle): Promise<IVehicle | null> {
        const index = this.vehicles.findIndex(c => c.id == vehicle.id);
        this.vehicles[index] = { ...vehicle, ...this.vehicles[index] };
        return this.vehicles[index];
    }

    async delete(id: string): Promise<IVehicle | null> {
        const index = this.vehicles.findIndex(c => c.id == id);
        const vehicle = this.vehicles[index];
        this.vehicles.splice(index, 1);
        return vehicle;
    }
}

export class MongoVehicleRepository implements IVehicleRepository {
    private vehicles: IVehicle[] = [
        {
            id: "1",
            make: "Toyota",
            model: "Corolla",
            year: 2019,
            price: 890.0
        },
        {
            id: "2",
            make: "Renault",
            model: "Vectra",
            year: 2018,
            price: 98.0
        }
    ];

    constructor() {
        console.log("Construyendo repositorio de vehículos (mongo)");
    }

    async create(vehicle: Omit<IVehicle, "id">): Promise<IVehicle> {
        const lastId = parseInt(this.vehicles.at(-1)?.id ?? '0');
        this.vehicles.push({ id: (lastId + 1).toString(), ...vehicle });
        return this.vehicles.at(-1)!;
    }

    async findAll(): Promise<IVehicle[]> {
        return this.vehicles;
    }

    async findById(id: string): Promise<IVehicle | null> {
        return this.vehicles.find(c => c.id == id) ?? null;
    }

    async update(vehicle: IVehicle): Promise<IVehicle | null> {
        const index = this.vehicles.findIndex(c => c.id == vehicle.id);
        this.vehicles[index] = { ...vehicle, ...this.vehicles[index] };
        return this.vehicles[index];
    }

    async delete(id: string): Promise<IVehicle | null> {
        const index = this.vehicles.findIndex(c => c.id == id);
        const vehicle = this.vehicles[index];
        this.vehicles.splice(index, 1);
        return vehicle;
    }
}