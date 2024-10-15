import { createInterface } from "readline/promises";
import { config } from "../config/config.service.js";
import { database } from "../database/index.js";
import { setupDatabase } from "../database/setup.js";

export async function syncDatabase() {
    if (config.getDatabaseOptions().DIALECT != "postgres") {
        console.info("Sólo Postgres necesita de sincronización de la base de datos. En el caso de Mongo, las colecciones son creadas automáticamente.");
        console.log("Para proseguir cambie el dialecto a 'postgres'");
        return;
    }

    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const answer = await rl.question(`¿Está seguro que desea forzar la sincronización de base de datos?\nEsta acción podría eliminar datos ya guardados. (Y/n)`);

    try {
        if (answer == "Y") {
            console.log("Sincronizando base de datos...");
            await database.sync({
                force: true
            })
            await setupDatabase();
            console.log("Sincronización exitosa");
        }

    } catch (err) {
        console.error("Hubo un error en la sincronización", err);
    } finally {
        rl.close();
        database.close();
    }
}

syncDatabase();