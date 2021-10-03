import { createConnection } from "typeorm";
import { Puzzle } from "./entities/puzzle";
import { Record } from "./entities/record";
import { Room } from "./entities/room";
import { Word } from "./entities/word";

export async function connect() {
    return createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        synchronize: true,
        logging: true,
        entities: [
            "src/entities/**/*.ts"
        ],
        migrations: [
            "src/migrations/**/*.ts"
        ]
    })
}

export { Puzzle, Record, Room, Word }