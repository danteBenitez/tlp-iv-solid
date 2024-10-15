import path from "path";
import { Dialect } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { Database } from ".";
import { config as configService } from "../config/config.service.js";

export class PostgresDatabase implements Database {
    private static instance: Database | null = null
    private static config = configService.getDatabaseOptions()

    private constructor(
        private sequelize: Sequelize
    ) { }

    static getConnection() {
        if (!PostgresDatabase.instance) {
            const config = PostgresDatabase.config;
            const sequelize = new Sequelize(config.NAME, config.USER, config.PASSWORD, {
                dialect: config.DIALECT as Dialect,
                host: config.HOST,
                port: config.PORT,
                database: config.NAME,
                models: [path.resolve('dist/models/postgres/*.model.js')]
            });
            PostgresDatabase.instance = new PostgresDatabase(sequelize)
        }
        return PostgresDatabase.instance;
    }

    async sync(opts: { force: boolean }): Promise<void> {
        await this.sequelize.sync(opts);
    }

    async close(): Promise<void> {
        return this.sequelize.close();
    }

    async checkConnection() {
        return this.sequelize.authenticate();
    }
}