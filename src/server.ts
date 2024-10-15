import cors from "cors";
import express, { NextFunction, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import clientRouter from "./routes/client.routes.js";
import { ValidationError } from "./validations/validation-adapter.js";

type Callback = () => Promise<void>;

export class Server {
    private onBeforeStartCallbacks: Callback[];

    constructor(
        private app: express.Application
    ) {
        this.onBeforeStartCallbacks = [];
        this.addMiddleware();
        this.routes();
        // @ts-ignore
        this.app.use((err, req, res, next) => this.globalErrorHandler(err, req, res, next));
    }

    async start(port = 3000) {
        for (const callback of this.onBeforeStartCallbacks) {
            await callback();
        }

        return this.app.listen(port, () => {
            console.log(`Servidor escuchando en el puerto ${port}`);
        })
    }

    protected routes() {
        this.app.use('/clients', clientRouter);
    }

    protected addParsers() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    globalErrorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
        if (err instanceof ValidationError) {
            return res.status(400).json(err.issues());
        }
        console.error(err);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }

    protected addMiddleware() {
        this.addParsers();

        this.app.use(morgan("dev"));
        this.app.use(helmet());
        this.app.use(cors({
            origin: "*"
        }));
    }

    /**
     * Registra un callback a ser llamado antes de iniciar el servidor.
     */
    onBeforeStart(callback: Callback) {
        this.onBeforeStartCallbacks.push(callback);
    }
}