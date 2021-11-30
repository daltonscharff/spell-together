import { connect, Puzzle } from "@daltonscharff/spelling-bee-core";
import fastify from "fastify";
import socketio from "fastify-socket.io";
import { Socket } from "socket.io";

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
  // @ts-ignore
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

export type GameReadServer = Pick<
  Puzzle,
  "date" | "letters" | "centerLetter" | "maxScore"
>;

export type GameGuessClient = string;
export type GameGuessServer = boolean;

function onConnection(socket: Socket) {
  // @ts-ignore
  console.log(socket.client.conn.server.clientsCount + " users connected");

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

main();
