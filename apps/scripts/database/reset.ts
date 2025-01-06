import { Guess, Puzzle, Room, User, Word } from "../../../packages/shared";
import readline from "readline/promises";
import { stdin, stdout } from "process";
import config from "config";
import { databases } from "../../../packages/shared/appwriteClient";

const DATABASE_NAME = "spell-together";

async function deleteDatabase(databaseId: string) {
  return databases
    .delete(databaseId)
    .then(() => console.log("database deleted"));
}

async function createDatabase(databaseId: string, name: string) {
  return databases
    .create(databaseId, name)
    .then(() => console.log("database created"));
}

async function createCollections() {
  let successesCount = 0;
  for (let collection of [Word, User, Puzzle, Room, Guess]) {
    await collection
      .createCollection()
      .then(() => successesCount++)
      .catch((err) => console.log("Error creating collection:", err));
  }
  return console.log(`${successesCount} collections created`);
}

(async () => {
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });
  const hasConsent = await rl.question(
    "Are you sure you want to clear and reseed the database? (y/N) "
  );
  rl.close();
  if (hasConsent !== "y") {
    process.exit();
  }

  await deleteDatabase(config.DATABASE_ID).catch((err) => {
    console.log("Error deleting database:", err);
  });
  await createDatabase(config.DATABASE_ID, DATABASE_NAME).catch((err) => {
    console.log("Error creating database:", err);
    process.exit(1);
  });
  await createCollections().catch((err) => {
    console.log("Error creating collections:", err);
    process.exit(2);
  });
})();
