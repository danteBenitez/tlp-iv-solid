import { IClientRepository } from "../interfaces/client-repository.interface";
import { IClient } from "../interfaces/client.interface";
import Client from "../models/client.model";

export class PostgresClientRepository implements IClientRepository {
    constructor(private clientModel: typeof Client) { }

    create(client: Omit<IClient, "id">): Promise<IClient> {
        return this.clientModel.create(client);
    }

    findById(id: string): Promise<IClient | null> {
        return this.clientModel.findByPk(id);
    }

    async update(client: Partial<IClient> & { id: string }): Promise<IClient | null> {
        const [affected, clientUpdated] = await this.clientModel.update(client, {
            where: {
                id: client.id
            },
            returning: ["email", "id", "phone_number", "name"]
        });

        if (affected <= 0) {
            return null;
        }

        return clientUpdated[0];
    }

    async delete(id: string): Promise<IClient | null> {
        const found = await this.clientModel.findByPk(id);
        if (!found) {
            return null;
        }

        found.destroy();
        return found;
    }
}