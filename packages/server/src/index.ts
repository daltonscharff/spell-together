import { connect, Puzzle } from "@daltonscharff/spelling-bee-core";
import fastify from "fastify";
import socketio from "fastify-socket.io";

const server = fastify();
const port = process.env.SERVER_PORT || 3000;
const host = process.env.SERVER_HOST || "localhost";

async function main() {
  const dbPromise = connect({
    url: process.env.DATABASE_URL,
    logging: process.env.NODE_ENV === "development",
  });

  server.register(socketio, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  try {
    await server.ready();
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
  server.io.on("connection", onConnection);
  server.io.on("disconnect", (socket) =>
    console.log(socket.client.conn.server.clientsCount + " users connected")
  );

  const fastifyPromise = server.listen(port, host);

  try {
    await Promise.all([dbPromise, fastifyPromise]);
    console.log(`Server started on http://${host}:${port}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

function onConnection(socket) {
  console.log(socket.client.conn.server.clientsCount + " users connected");
  socket.on("game:read", async () => {
    const puzzle = await Puzzle.findOne();
    delete puzzle.id;
    socket.emit("game:read", puzzle);
  });
}

main();
