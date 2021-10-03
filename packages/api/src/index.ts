import { connect, Room } from "spelling-bee-core";
import fastify from "fastify";

const server = fastify({});

server.get('/ping', async (request, reply) => {
    return { pong: 'it worked!' };
});

server.get('/rooms', async (request, reply) => {
    return Room.find();
});

connect({
    url: process.env.DATABASE_URL,
    logging: true
})
    .then(async () => {
        try {
            await server.listen(3000);
            console.log("Server started on http://localhost:3000");
        } catch (err) {
            server.log.error(err);
            process.exit(1);
        }
    })
    .catch((error) => console.log(error))