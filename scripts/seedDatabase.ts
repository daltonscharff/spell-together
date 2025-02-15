import { faker } from "@faker-js/faker";
import { Guess, Puzzle, Room, User, Word } from "./collections";
import readline from "readline/promises";
import { stdin, stdout } from "process";

enum Collections {
  WORDS = "words",
  PUZZLES = "puzzles",
  ROOMS = "rooms",
  USERS = "users",
  GUESSES = "guesses",
}

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});
const hasConsent = await rl.question(
  "Are you sure you want to seed the database? (y/N) "
);
rl.close();
if (hasConsent !== "y") {
  process.exit();
}

// function createWord(): { id: WordId } & Word {
//   return {
//     ...createBaseType(),
//     id: faker.word.sample({ length: { min: 4, max: 14 } }),
//     pointValue: faker.number.int({ min: 2, max: 10 }),
//     isPangram: faker.datatype.boolean(),
//     partOfSpeech: faker.helpers.arrayElement([
//       "noun",
//       "pronoun",
//       "verb",
//       "adverb",
//       "adjective",
//       "preposition",
//       "conjunction",
//       "interjection",
//     ]),
//     definition: faker.lorem.sentence(),
//   };
// }

// function createPuzzle(wordIds: WordId[]): { id: PuzzleId } & Puzzle {
//   const base = createBaseType();
//   return {
//     ...base,
//     id: faker.string.uuid(),
//     date: base.createdAt,
//     outerLetters: faker.string.alpha(6).split(""),
//     centerLetter: faker.string.alpha(1),
//     maxScore: faker.number.int({ min: 100, max: 300 }),
//     words: wordIds,
//   };
// }

// function createRoom(users: UserId[], owner: UserId): { id: RoomId } & Room {
//   return {
//     ...createBaseType(),
//     id: faker.string.uuid(),
//     name: faker.lorem.words({ min: 1, max: 3 }),
//     users,
//     owner,
//   };
// }

// function createUser(): { id: UserId } & User {
//   return {
//     ...createBaseType(),
//     id: faker.string.uuid(),
//     email: faker.internet.email(),
//     firstName: faker.person.firstName(),
//     lastName: faker.person.lastName(),
//   };
// }

// function createGuess(
//   userId: UserId,
//   roomId: RoomId,
//   puzzleId: PuzzleId,
//   wordId: WordId,
//   isCorrect: boolean = true
// ): { id: GuessId } & Guess {
//   return {
//     ...createBaseType(),
//     id: faker.string.uuid(),
//     userId,
//     roomId,
//     puzzleId,
//     wordId,
//     isCorrect,
//   };
// }

// await Promise.all(
//   Object.values(Collections).map(async (collection) => {
//     console.info("Wiping collection", collection);
//     return wipeFirestoreCollection(db, collection);
//   })
// )
//   .catch((err) => {
//     console.error("Error wiping collections", err);
//     process.exit(1);
//   })
//   .then(() => console.info("All collections wiped"));

// const words = faker.helpers.multiple(createWord, {
//   count: { min: 15, max: 30 },
// });
// const users = [createUser(), createUser(), createUser()];
// const room = createRoom([users[0].id, users[1].id], users[0].id);
// const puzzle = createPuzzle(words.map((word) => word.id));
// const guesses = [
//   createGuess(
//     users[0].id,
//     room.id,
//     puzzle.id,
//     faker.helpers.arrayElement(words).id,
//     true
//   ),
//   createGuess(
//     users[0].id,
//     room.id,
//     puzzle.id,
//     faker.helpers.arrayElement(words).id,
//     true
//   ),
//   createGuess(
//     users[1].id,
//     room.id,
//     puzzle.id,
//     faker.helpers.arrayElement(words).id,
//     true
//   ),
// ];

// const batch = db.batch();
// words.forEach((word) =>
//   batch.set(db.collection(Collections.WORDS).doc(word.id), {
//     ...word,
//     createdAt: clientToAdminTimestamp(word.createdAt),
//     id: undefined,
//   })
// );

// users.forEach((user) =>
//   batch.set(db.collection(Collections.USERS).doc(user.id), {
//     ...user,
//     createdAt: clientToAdminTimestamp(user.createdAt),
//     id: undefined,
//   })
// );

// batch.set(db.collection(Collections.ROOMS).doc(room.id), {
//   ...room,
//   createdAt: clientToAdminTimestamp(room.createdAt),
//   id: undefined,
// });

// batch.set(db.collection(Collections.PUZZLES).doc(puzzle.id), {
//   ...puzzle,
//   date: clientToAdminTimestamp(puzzle.date),
//   createdAt: clientToAdminTimestamp(puzzle.createdAt),
//   id: undefined,
// });

// guesses.forEach(async (guess) =>
//   batch.set(db.collection(Collections.GUESSES).doc(guess.id), {
//     ...guess,
//     createdAt: clientToAdminTimestamp(guess.createdAt),
//     id: undefined,
//   })
// );

// console.info("Writing to firestore...");
// await batch
//   .commit()
//   .catch((err) => console.error("Error writing to firestore", err))
//   .then(() => console.info("Writing complete"));
