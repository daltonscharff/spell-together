import { faker } from "@faker-js/faker";
import { Timestamp } from "@firebase/firestore";
import type { BaseType } from "~/types/baseType";
import type { Game, GameId } from "~/types/game";
import type { Guess, GuessId } from "~/types/guess";
import type { Puzzle, PuzzleId } from "~/types/puzzle";
import type { Room, RoomId } from "~/types/room";
import type { User, UserId } from "~/types/user";
import type { Word, WordId } from "~/types/word";

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
    id: faker.word.sample(),
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

function createRoom(): { id: RoomId } & Room {
  const users = faker.helpers.multiple(() => faker.string.uuid());
  return {
    ...createBaseType(),
    id: faker.string.uuid(),
    name: faker.lorem.words({ min: 1, max: 3 }),
    users,
    owner: users[0],
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
