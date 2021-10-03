import { createConnection } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { Puzzle } from "./entities/puzzle";
import { Record } from "./entities/record";
import { Room } from "./entities/room";
import { Word } from "./entities/word";

export async function connect(options?: Omit<PostgresConnectionOptions, "type">) {
    return createConnection({
        type: "postgres",
        entities: [
            Puzzle,
            Record,
            Room,
            Word
        ],
        migrations: [
            "./migrations/**/*.ts"
        ],
        ...options
    })
}

export { Puzzle, Record, Room, Word }

if (require.main === module) {
    connect({
        url: process.env.DATABASE_URL,
        synchronize: true,
        logging: true
    })
        .then((connection) => {
            connection.close();
        })
        .catch((error) => console.log(error));
}