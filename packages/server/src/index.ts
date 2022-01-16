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

    updatePuzzle(socket);
    updateFoundWords(socket, "123456");
    onSubmitWord(socket);
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

async function updatePuzzle(socket) {
  const puzzle = await prisma.puzzle.findFirst();
  delete puzzle.id;
  socket.emit("updatePuzzle", puzzle);
}

async function updateFoundWords(socket, roomCode: string) {
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
  const foundWords = records.map((record) => ({
    username: record.user,
    foundAt: record.createdAt.toISOString(),
    word: record.word.word,
    pointValue: record.word.pointValue,
    definition: record.word.definition,
    partOfSpeech: record.word.partOfSpeech,
    synonym: record.word.synonym,
    isPangram: record.word.isPangram,
  }));

  socket.emit("updateFoundWords", { foundWords });
}

async function onSubmitWord(socket) {
  socket.on(
    "submitWord",
    async (data: { username: string; roomCode: string; word: string }) => {
      const word = await prisma.word.findUnique({
        where: {
          word: data.word.toLowerCase(),
        },
        select: {
          id: true,
        },
      });
      const room = await prisma.room.findUnique({
        where: {
          code: data.roomCode,
        },
      });
      if (word && room) {
        const count = await prisma.record.count({
          where: {
            roomId: room.id,
            wordId: word.id,
          },
        });
        if (count === 0) {
          await prisma.record.create({
            data: {
              user: data.username,
              roomId: room.id,
              wordId: word.id,
            },
          });
        }
      }
      updateFoundWords(socket, data.roomCode);
    }
  );
}
