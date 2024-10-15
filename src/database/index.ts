import { config } from "../config/config.service";
import { MongoDatabase } from "./mongo";
import { PostgresDatabase } from "./postgres";

export interface Database {
    sync(opts: { force: boolean }): Promise<void>;
    close(): Promise<void>;
    checkConnection(): Promise<void>
}

export const database: Database = config.getDatabaseOptions().DIALECT == "postgres" ?
    PostgresDatabase.getConnection()
    : MongoDatabase.getConnection();