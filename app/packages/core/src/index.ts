import Knex from "knex";
import knexConfig from "../knexfile";
import { Model } from "objection";
import Puzzle from "./models/Puzzle";
import Record from "./models/Record";
import Room from "./models/Room";
import Word from "./models/Word";

export default async function connect() {
  const knex =
    process.env.NODE_ENV === "production"
      ? Knex(knexConfig.production)
      : Knex(knexConfig.development);

  await knex.raw("SELECT 1");

  Model.knex(knex);

  return knex;
}

export { Puzzle, Record, Room, Word };
