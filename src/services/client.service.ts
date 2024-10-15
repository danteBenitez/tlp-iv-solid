import { IClientRepository } from "../interfaces/client-repository.interface";
import { IClient } from "../models/client.interface";

export class ClientService {

    constructor(private repository: IClientRepository) { }

    async findAll(): Promise<IClient[]> {
        return this.repository.findAll();
    }

    async findOne(id: string): Promise<IClient | null> {
        return this.repository.findById(id);
    }

    async create(client: Omit<IClient, "id">): Promise<IClient | null> {
        return this.repository.create(client);
    }

    async update(client: Partial<IClient> & { id: string }): Promise<IClient | null> {
        return this.repository.update(client);
    }

    async delete(id: string): Promise<IClient | null> {
        return this.repository.delete(id);
    }
}