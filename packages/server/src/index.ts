import { prisma, FoundWord, Puzzle } from "@daltonscharff/spelling-bee-core";
import fastify from "fastify";
import socketio from "fastify-socket.io";

const server = fastify();
const port = process.env.SERVER_PORT || 3000;
const host = process.env.SERVER_HOST || "localhost";

server.register(socketio, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

server.ready().then(async () => {
  server.io.on("connection", async (socket) => {
    // @ts-ignore
    console.log(socket.client.conn.server.clientsCount + " users connected");

    socket.emit("updatePuzzle", await getPuzzle());

    socket.emit("updateFoundWords", {
      foundWords: await getFoundWords("123456"),
    });
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

async function getPuzzle(): Promise<Omit<Puzzle, "id">> {
  const puzzle = await prisma.puzzle.findFirst();
  console.log(puzzle);
  delete puzzle.id;
  return puzzle;
}

async function getFoundWords(roomCode: string): Promise<FoundWord[]> {
  const { id: roomId } = await prisma.room.findUnique({
    where: {
      code: roomCode,
    },
  });
  const records = await prisma.record.findMany({
    where: {
      roomId,
    },
    select: {
      createdAt: true,
      user: true,
      word: true,
    },
  });

  return records.map((record) => ({
    username: record.user,
    foundAt: record.createdAt.toISOString(),
    word: record.word.word,
    pointValue: record.word.pointValue,
    definition: record.word.definition,
    partOfSpeech: record.word.partOfSpeech,
    synonym: record.word.synonym,
    isPangram: record.word.isPangram,
  }));
}
