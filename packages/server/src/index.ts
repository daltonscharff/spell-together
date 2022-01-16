import { prisma } from "@daltonscharff/spelling-bee-core";
import fastify from "fastify";
import socketio from "fastify-socket.io";

const server = fastify();
const port = process.env.SERVER_PORT || 3000;
const host = process.env.SERVER_HOST || "localhost";

server.register(socketio, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

server.ready().then(() => {
  server.io.on("connection", async (socket) => {
    // @ts-ignore
    console.log(socket.client.conn.server.clientsCount + " users connected");

    const puzzle = await prisma.puzzle.findFirst();
    console.log(puzzle);
    delete puzzle.id;
    socket.emit("updatePuzzle", puzzle);

    socket.emit("updateFoundWords", {});
  });

  server.io.on("disconnect", (socket) =>
    console.log(socket.client.conn.server.clientsCount + " users connected")
  );

  server
    .listen(port, host)
    .then(() => console.log(`Server started on http://${host}:${port}`))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
});
