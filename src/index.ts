import express from "express";
import { config } from "./config/config.service.js";
import { setupDatabase } from "./database/setup.js";
import { Server } from "./server.js";

const app = express();

const server = new Server(app);

const PORT = config.getServerPort();

server
    .onBeforeStart(async () => {
        await setupDatabase()
            .then(() => console.log(`Conexión exitosa a base de datos: ${config.getDatabaseOptions().DIALECT}`))
    })

server.start(PORT);