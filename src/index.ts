import express from "express";
import { config } from "./config/config.service.js";
import { Server } from "./server.js";

const app = express();

const server = new Server(app);

const PORT = config.getServerPort();

server.start(PORT);