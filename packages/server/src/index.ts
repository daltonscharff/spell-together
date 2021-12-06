import fastify from "fastify";
import socketio from "fastify-socket.io";
import { Socket } from "socket.io";

const server = fastify();
const port = process.env.SERVER_PORT || 3000;
const host = process.env.SERVER_HOST || "localhost";

async function main() {
  server.register(socketio, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  try {
    await server.ready();
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }

  server.io.on("connection", (socket) => {
    // @ts-ignore
    console.log(socket.client.conn.server.clientsCount + " users connected");
    onConnection(socket);
  });
  server.io.on("disconnect", (socket) =>
    console.log(socket.client.conn.server.clientsCount + " users connected")
  );

  await server.listen(port, host, (err, address) => {
    console.error(err);
    process.exit(1);
  });
  console.log(`Server started on http://${host}:${port}`);
}

function onConnection(socket) {
  socket.on("joinRoom", ({ user, room }) => {
    socket.rooms.forEach((room) => {
      socket.leave(room);
    });
    socket.to(room).emit("userConnected", { user, room });
    socket.join(room);
    console.log(user, "joining", room);
  });
  socket.on("leaveRoom", ({ user, room }) => {
    socket.leave(room);
    socket.to(room).emit("userDisconnected", { user, room });
    console.log(user, "leaving", room);
  });

  socket.on("game:read", async () => {
    const puzzle = await Puzzle.findOne();
    socket.emit("game:read", {
      date: puzzle.date,
      letters: puzzle.letters,
      centerLetter: puzzle.centerLetter,
      maxScore: puzzle.maxScore,
    });
  });
}

function roomHandler(io, socket) {}

main();
