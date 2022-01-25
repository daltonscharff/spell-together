import {
  prisma,
  Record,
  Room,
  Word,
  FoundWord,
} from "@daltonscharff/spelling-bee-core";
import fastify from "fastify";
import socketio from "fastify-socket.io";

const server = fastify();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

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

if (process.env.NODE_ENV !== "production") {
  prisma.$on("query", (e) => {
    console.log("Query:", e.query);
    console.log("Duration:", e.duration, "ms");
  });
}

async function updatePuzzle(socket) {
  const puzzle = await prisma.puzzle.findFirst();
  delete puzzle.id;
  socket.emit("updatePuzzle", puzzle);
}

async function updateFoundWords(socket, roomCode: string) {
  const rows = await prisma.$queryRaw<
    (Record & Room & Word & { createdAt: string })[]
  >`
    SELECT
      *,
      record.id AS "id"
    FROM 
      record
      JOIN word ON word.id = record."wordId"
      JOIN room ON room.id = record."roomId"
    WHERE 
      "roomId" = (
        SELECT id 
        FROM room
        WHERE code = ${roomCode}
      );
  `;
  const foundWords: FoundWord[] = rows.map((row) => ({
    user: row.user,
    foundAt: row.createdAt,
    word: row.word,
    pointValue: row.pointValue,
    definition: row.definition,
    partOfSpeech: row.partOfSpeech,
    synonym: row.synonym,
    isPangram: row.isPangram,
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
