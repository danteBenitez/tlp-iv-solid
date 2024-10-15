import mongoose, { Mongoose } from "mongoose";
import { Database } from ".";
import { config as configService } from "../config/config.service.js";

export class MongoDatabase implements Database {
    private static instance: MongoDatabase | null = null
    private static config = configService.getDatabaseOptions()

    private constructor(
        private mongoose: Mongoose
    ) { }

    static getConnection(): MongoDatabase {
        if (!MongoDatabase.instance) {
            MongoDatabase.instance = new MongoDatabase(mongoose)
        }
        return MongoDatabase.instance!;
    }

    async sync(opts: { force: boolean }): Promise<void> {
        // Mongoose creates collections when they are inserted to automatically, 
        // so sync is a noop
    }

    async close(): Promise<void> {
        return this.mongoose.disconnect();
    }

    async checkConnection() {
        const config = MongoDatabase.config;
        const url = `mongodb://${config.USER}:${config.PASSWORD}@${config.HOST}:${config.PORT}`;
        this.mongoose.connect(url, {
            autoCreate: true,
        });
    }

}