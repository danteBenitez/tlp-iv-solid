import { database } from ".";
import { config } from "../config/config.service";
import { seedDatabase } from "./seed";

export async function setupDatabase() {
    if (config.getDatabaseOptions().DIALECT == "postgres") {
        await seedDatabase();
    }

    return database.checkConnection();
}