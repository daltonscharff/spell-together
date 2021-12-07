import { prisma, Record } from "@daltonscharff/spelling-bee-core";

export async function createRoom(name: string) {
  return prisma.room.create({
    data: {
      name,
    },
  });
}

export async function readRoom(code: string) {
  return prisma.room.findUnique({
    where: {
      code,
    },
    include: {
      records: true,
    },
  });
}

export async function readPuzzle() {
  return prisma.puzzle.findFirst();
}

export type GuessWordResponse = {
  validWord: boolean;
  record?: Record;
};

export async function guessWord(
  roomCode: string,
  word: string,
  user: string
): Promise<GuessWordResponse> {
  const { id: wordId, pointValue: wordScore } = (await prisma.word.findUnique({
    where: {
      word,
    },
    select: {
      id: true,
      pointValue: true,
    },
  })) || { id: null };

  if (!wordId) return { validWord: false };

  const { id: roomId, score: roomScore } = (await prisma.room.findUnique({
    where: {
      code: roomCode,
    },
    select: {
      id: true,
      score: true,
    },
  })) || { id: null };

  if (!roomId) throw Error(`roomId not found: ${roomId}`);

  const record = await prisma.record.findFirst({
    where: {
      wordId,
      roomId,
    },
  });

  if (!record) {
    await Promise.all([
      prisma.record.create({
        data: {
          wordId,
          roomId,
          user,
        },
      }),
      prisma.room.update({
        where: {
          id: roomId,
        },
        data: {
          score: roomScore + wordScore,
        },
      }),
    ]);
  }

  return {
    validWord: true,
    record,
  };
}

// guessWord("123456", "word", "testUser")
//   .then((res) => console.log(res))
//   .catch((err) => console.error("ERROR", err));

guessWord("123456", "acai", "testUser")
  .then((res) => console.log("guessWord", res))
  .catch((err) => console.error("ERROR", err));

// createRoom("123456")
//   .then((res) => console.log(res))
//   .catch((err) => console.error("ERROR", err));

// readPuzzle()
//   .then((res) => console.log(res))
//   .catch((err) => console.error("ERROR", err));

readRoom("123456")
  .then((res) => console.log("readRoom", res))
  .catch((err) => console.error("ERROR", err));
