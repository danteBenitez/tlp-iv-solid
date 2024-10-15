import { IClient } from "../models/client.interface";

export interface IClientRepository {
    create(client: Omit<IClient, "id">): Promise<IClient>;
    findAll(): Promise<IClient[]>;
    findById(id: string): Promise<IClient | null>;
    update(client: Partial<IClient> & { id: string }): Promise<IClient | null>;
    delete(id: string): Promise<IClient | null>;
}