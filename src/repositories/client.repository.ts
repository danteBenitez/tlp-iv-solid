import { IClientRepository } from "../interfaces/client-repository.interface";
import { IClient } from "../models/client.interface";

export class PostgresClientRepository implements IClientRepository {
    private clients: IClient[] = [
        {
            id: "1",
            email: "johndoe@gmail.com",
            name: "John Doe",
            phone_number: 3704503824
        },
        {
            id: "2",
            email: "janedoe@gmail.com",
            name: "Jane Doe",
            phone_number: 3704503024
        }
    ];

    constructor() {
        console.log("Construyendo repositorio de clientes (postgres)");
    }

    async findAll(): Promise<IClient[]> {
        return this.clients;
    }

    async create(client: Omit<IClient, "id">): Promise<IClient> {
        const lastId = parseInt(this.clients.at(-1)?.id ?? '0');
        this.clients.push({ id: (lastId + 1).toString(), ...client });
        return this.clients.at(-1)!;
    }

    async findById(id: string): Promise<IClient | null> {
        return this.clients.find(c => c.id == id) ?? null;
    }

    async update(client: Partial<IClient> & { id: string }): Promise<IClient | null> {
        const index = this.clients.findIndex(c => c.id == client.id);
        this.clients[index] = { ...client, ...this.clients[index] };
        return this.clients[index];
    }

    async delete(id: string): Promise<IClient | null> {
        const index = this.clients.findIndex(c => c.id == id);
        const client = this.clients[index];
        this.clients.splice(index, 1);
        return client;
    }
}

export class MongoClientRepository implements IClientRepository {
    private clients: IClient[] = [
        {
            id: "1",
            email: "johndoe@gmail.com",
            name: "John Doe",
            phone_number: 3704503824
        },
        {
            id: "2",
            email: "janedoe@gmail.com",
            name: "Jane Doe",
            phone_number: 3704503024
        }
    ];

    constructor() {
        console.log("Construyendo repositorio de clientes (mongo)");
    }

    async findAll(): Promise<IClient[]> {
        return this.clients;
    }

    async create(client: Omit<IClient, "id">): Promise<IClient> {
        const lastId = parseInt(this.clients.at(-1)?.id ?? '0');
        this.clients.push({ id: (lastId + 1).toString(), ...client });
        return this.clients.at(-1)!;
    }

    async findById(id: string): Promise<IClient | null> {
        return this.clients.find(c => c.id == id) ?? null;
    }

    async update(client: Partial<IClient> & { id: string }): Promise<IClient | null> {
        const index = this.clients.findIndex(c => c.id == client.id);
        this.clients[index] = { ...client, ...this.clients[index] };
        return this.clients[index];
    }

    async delete(id: string): Promise<IClient | null> {
        const index = this.clients.findIndex(c => c.id == id);
        const client = this.clients[index];
        this.clients.splice(index, 1);
        return client;
    }
}