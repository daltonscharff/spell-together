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

export type GameReadServer = Pick<
  Puzzle,
  "date" | "letters" | "centerLetter" | "maxScore"
>;

export type GameGuessClient = string;
export type GameGuessServer = boolean;

function onConnection(socket) {
  console.log(socket.client.conn.server.clientsCount + " users connected");

  socket.on("room:join", (data) => {
    socket.rooms.forEach((room) => {
      socket.leave(room);
    });
    socket.join(data.room);
    console.log("joining", data.room);
  });
  socket.on("room:leave", (data) => {
    socket.leave(data.room);
    console.log("leaving", data.room);
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
