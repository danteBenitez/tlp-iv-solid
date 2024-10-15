/**
 * Función auxiliar que arroja un error de mensaje claro cuando una variable de entorno
 * está ausente.
 * 
 * @param {string} key
 */
const getEnvOrFail = (key: string) => {
    const value = process.env[key];
    if (value == null) {
        throw new Error(`Variable de entorno ${key} faltante.`);
    }
    return value;
}

type ApplicationConfig = {
    DATABASE: {
        HOST: string;
        PORT: number;
        USER: string;
        PASSWORD: string;
        NAME: string;
        DIALECT: "postgres" | "mongo";
    },
    PORT: string,
    SALT_ROUNDS: number,
    SECRET: string
}

class ConfigService {
    private constructor(
        private config: ApplicationConfig
    ) { }

    static fromEnv(): ConfigService {
        const config = {
            DATABASE: {
                HOST: getEnvOrFail("DB_HOST"),
                PORT: parseInt(getEnvOrFail("DB_PORT")),
                USER: getEnvOrFail("DB_USER"),
                PASSWORD: getEnvOrFail("DB_PASSWORD"),
                NAME: getEnvOrFail("DB_NAME"),
                DIALECT: getEnvOrFail("DB_DIALECT"),
            },
            PORT: getEnvOrFail("PORT"),
            SALT_ROUNDS: parseInt(getEnvOrFail("SALT_ROUNDS")),
            SECRET: getEnvOrFail("JWT_SECRET")
        };
        if (config.DATABASE.DIALECT != "postgres" && config.DATABASE.DIALECT != "mongo") {
            throw new Error("La aplicación sólo soporta los dialectos: postgres y mongo");
        }
        const service = new ConfigService(config as ApplicationConfig);
        return service;
    }


    getSecret() {
        return this.config["SECRET"];
    }

    getSalt() {
        return this.config["SALT_ROUNDS"];
    }

    getDatabaseOptions() {
        return this.config["DATABASE"];
    }

    getServerPort() {
        return parseInt(this.config["PORT"]);
    }
}

export const config = ConfigService.fromEnv();