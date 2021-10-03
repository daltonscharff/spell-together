import { connect, Room } from "spelling-bee-core";
import fastify from "fastify";

const server = fastify({});

server.get('/ping', async (request, reply) => {
    return { pong: 'it worked!' };
});

server.get('/', async (request, reply) => {

});

console.log(connect, Room)

// const start = async () => {
//     try {
//         await server.listen(3000);
//         console.log("Server started on http://localhost:3000");
//     } catch (err) {
//         server.log.error(err);
//         process.exit(1);
//     }
// }
// start();

// connect().then(async () => {
//     try {
//         await server.listen(3000);
//         console.log("Server started on http://localhost:3000");
//     } catch (err) {
//         server.log.error(err);
//         process.exit(1);
//     }
// });