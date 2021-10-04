import { connect, Room, Word } from "spelling-bee-core";
import fastify from "fastify";

const server = fastify({});

server.get('/ping', async (request, reply) => {
    return { pong: 'it worked!' };
});

server.get('/rooms', async (request, reply) => {
    return Room.find();
});

server.get('/words', async (request, reply) => {
    return Word.find();
})

connect({
    url: process.env.DATABASE_URL,
    logging: process.env.NODE_ENV === "development"
})
    .then(async () => {
        try {
            const port = process.env.APP_PORT || 3000;
            const host = process.env.APP_HOST || "localhost"
            await server.listen(port, host);
            console.log(`Server started on http://${host}:${port}`);
        } catch (error) {
            server.log.error(error);
            process.exit(1);
        }
    })
    .catch((error) => console.log(error))