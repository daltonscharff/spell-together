const environmentVariables = [
  "APPWRITE_PROJECT_ID",
  "APPWRITE_API_KEY",
  "DATABASE_ID",
  "GUESS_COLLECTION_ID",
  "PUZZLE_COLLECTION_ID",
  "ROOM_COLLECTION_ID",
  "USER_COLLECTION_ID",
  "WORD_COLLECTION_ID",
];

const config: Record<string, string> = {};

for (let environmentVariableName of environmentVariables) {
  const value = process.env[environmentVariableName];
  if (value === undefined || value === null) {
    throw Error(`Missing environment variable: ${environmentVariableName}`);
  }
  config[environmentVariableName] = value;
}

export default config;
