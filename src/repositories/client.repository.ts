import { IClientRepository } from "../interfaces/client-repository.interface";
import { IClient } from "../interfaces/client.interface";
import { ClientModel } from "../models/mongo/client.model";
import Client from "../models/postgres/client.model";
import { parseIntegerId } from "../utils/parse-integer-id";
import { parseObjectId } from "../utils/parse-object-id";

export class PostgresClientRepository implements IClientRepository {
    constructor(private clientModel: typeof Client) { }

    findAll(): Promise<IClient[]> {
        return this.clientModel.findAll();
    }

    create(client: Omit<IClient, "id">): Promise<IClient> {
        return this.clientModel.create(client);
    }

    async findById(id: string): Promise<IClient | null> {
        const parsed = parseIntegerId(id);
        if (!parsed) return null;
        return this.clientModel.findByPk(parsed);
    }

    async update(client: Partial<IClient> & { id: string }): Promise<IClient | null> {
        const parsed = parseIntegerId(client.id);
        if (!parsed) return null;
        const [affected, clientUpdated] = await this.clientModel.update(client, {
            where: {
                id: parsed
            },
            returning: ["email", "id", "phone_number", "name"]
        });

        if (affected <= 0) {
            return null;
        }

        return clientUpdated[0];
    }

    async delete(id: string): Promise<IClient | null> {
        const parsed = parseIntegerId(id);
        if (!parsed) return null;
        const found = await this.clientModel.findByPk(parsed);
        if (!found) {
            return null;
        }

        found.destroy();
        return found;
    }
}

export class MongoClientRepository implements IClientRepository {
    constructor(private clientModel: typeof ClientModel) { }

    async create(client: Omit<IClient, "id">): Promise<IClient> {
        return this.clientModel.create(client);
    }

    findAll(): Promise<IClient[]> {
        return this.clientModel.find();
    }

    async update(client: Partial<IClient> & { id: string; }): Promise<IClient | null> {
        const parsed = parseObjectId(client.id);
        if (!parsed) return null;
        const found = await this.clientModel.findOneAndUpdate({ _id: parsed }, client, {
            new: true,
            sanitizeFilter: false
        });

        if (!found) {
            return null;
        }

        return found;
    }

    async findById(id: string): Promise<IClient | null> {
        const parsed = parseObjectId(id);
        if (!parsed) return null
        return this.clientModel.findById(parsed);
    }

    async delete(id: string): Promise<IClient | null> {
        const parsed = parseObjectId(id);
        if (!parsed) return null
        const client = await this.clientModel.findOne({ _id: parsed });
        if (!client) return null;
        await client.deleteOne();
        return client;
    }
}