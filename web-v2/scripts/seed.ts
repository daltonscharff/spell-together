import { faker } from "@faker-js/faker";
import { Timestamp } from "@firebase/firestore";
import type { BaseType } from "~/types/baseType";
import type { Game, GameId } from "~/types/game";
import type { Guess, GuessId } from "~/types/guess";
import type { Puzzle, PuzzleId } from "~/types/puzzle";
import type { Room, RoomId } from "~/types/room";
import type { User, UserId } from "~/types/user";
import type { Word, WordId } from "~/types/word";
import admin, { type ServiceAccount } from "firebase-admin";
import {
  getFirestore,
  Timestamp as AdminTimestamp,
} from "firebase-admin/firestore";
import serviceAccount from "../credentials.json";

function createBaseType(): BaseType {
  const ts = Timestamp.fromDate(faker.date.recent());
  return {
    createdAt: ts,
    updatedAt: ts,
  };
}

function createWord(): { id: WordId } & Word {
  return {
    ...createBaseType(),
    id: faker.word.sample({ length: { min: 4, max: 14 } }),
    pointValue: faker.number.int({ min: 2, max: 10 }),
    isPangram: faker.datatype.boolean(),
    partOfSpeech: faker.helpers.arrayElement([
      "noun",
      "pronoun",
      "verb",
      "adverb",
      "adjective",
      "preposition",
      "conjunction",
      "interjection",
    ]),
    definition: faker.lorem.sentence(),
  };
}

function createPuzzle(): { id: PuzzleId } & Puzzle {
  const base = createBaseType();
  return {
    ...base,
    id: faker.string.uuid(),
    date: base.createdAt,
    outerLetters: faker.string.alpha(6).split(""),
    centerLetter: faker.string.alpha(1),
    maxScore: faker.number.int({ min: 100, max: 300 }),
  };
}

function createRoom(users: UserId[], owner: UserId): { id: RoomId } & Room {
  return {
    ...createBaseType(),
    id: faker.string.uuid(),
    name: faker.lorem.words({ min: 1, max: 3 }),
    users,
    owner,
  };
}

function createUser(): { id: UserId } & User {
  return {
    ...createBaseType(),
    id: faker.string.uuid(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  };
}

function createGuess(
  userId: UserId,
  gameId: GameId,
  wordId: WordId,
  isCorrect: boolean = true
): { id: GuessId } & Guess {
  return {
    ...createBaseType(),
    id: faker.string.uuid(),
    userId,
    gameId,
    wordId,
    isCorrect,
  };
}

function createGame(puzzleId: PuzzleId, roomId: RoomId): { id: GameId } & Game {
  return {
    ...createBaseType(),
    id: faker.string.uuid(),
    puzzleId,
    roomId,
  };
}

/**
 * TODO:
 *  x load admin firebase
 *  - clear database (with cli confirmation)
 *  x write new fake data to firebase
 */

function clientToAdminTimestamp(clientTs: Timestamp): AdminTimestamp {
  return AdminTimestamp.fromDate(clientTs.toDate());
}

function initializeFirestore() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });

  return getFirestore();
}

const db = initializeFirestore();
db.settings({
  ignoreUndefinedProperties: true,
});
const batch = db.batch();

const words = faker.helpers.multiple(createWord, {
  count: { min: 15, max: 30 },
});
words.forEach((word) =>
  batch.set(db.collection("words").doc(word.id), {
    ...word,
    createdAt: clientToAdminTimestamp(word.createdAt),
    updatedAt: clientToAdminTimestamp(word.updatedAt),
    id: undefined,
  })
);

const users = [createUser(), createUser()];
users.forEach((user) =>
  batch.set(db.collection("users").doc(user.id), {
    ...user,
    createdAt: clientToAdminTimestamp(user.createdAt),
    updatedAt: clientToAdminTimestamp(user.updatedAt),
    id: undefined,
  })
);

const room = createRoom([users[0].id, users[1].id], users[0].id);
batch.set(db.collection("rooms").doc(room.id), {
  ...room,
  createdAt: clientToAdminTimestamp(room.createdAt),
  updatedAt: clientToAdminTimestamp(room.updatedAt),
  id: undefined,
});

const puzzle = createPuzzle();
batch.set(db.collection("puzzles").doc(puzzle.id), {
  ...puzzle,
  date: clientToAdminTimestamp(puzzle.date),
  createdAt: clientToAdminTimestamp(puzzle.createdAt),
  updatedAt: clientToAdminTimestamp(puzzle.updatedAt),
  id: undefined,
});

const game = createGame(puzzle.id, room.id);
batch.set(db.collection("games").doc(game.id), {
  ...game,
  createdAt: clientToAdminTimestamp(game.createdAt),
  updatedAt: clientToAdminTimestamp(game.updatedAt),
  id: undefined,
});

const guesses = [
  createGuess(users[0].id, game.id, faker.helpers.arrayElement(words).id, true),
  createGuess(users[0].id, game.id, faker.helpers.arrayElement(words).id, true),
  createGuess(users[1].id, game.id, faker.helpers.arrayElement(words).id, true),
];
guesses.forEach(async (guess) =>
  batch.set(db.collection("guesses").doc(guess.id), {
    ...guess,
    createdAt: clientToAdminTimestamp(guess.createdAt),
    updatedAt: clientToAdminTimestamp(guess.updatedAt),
    id: undefined,
  })
);

console.info("Writing to firestore...");
batch
  .commit()
  .catch((err) => console.error("Error writing to firestore", err))
  .then(() => console.info("Writing complete"));
