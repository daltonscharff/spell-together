require("dotenv").config();
const { knexSnakeCaseMappers } = require("objection");

const dbSettings = {
  client: "postgresql",
  connection: process.env.DB_CONNECTION_STRING,
  pool: {
    min: 0,
    max: 5,
  },
  migrations: {
    tableName: "migrations",
  },
  ...knexSnakeCaseMappers(),
};

module.exports = {
  development: dbSettings,
  production: dbSettings,
};
