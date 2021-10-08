import { connect } from "spelling-bee-core";
import fastify from "fastify";
import { bootstrap } from "@fastify-resty/core";
import typeorm from "@fastify-resty/typeorm";
import WordController from "./controllers/word";
import PuzzleController from "./controllers/puzzle";
import RecordController from "./controllers/record";
import RoomController from "./controllers/room";

const server = fastify({});

connect({
  url: process.env.DATABASE_URL,
  logging: process.env.NODE_ENV === "development",
})
.then(async (connection) => {
  server.register(typeorm, { connection });
  server.register(bootstrap, { controllers: [
    PuzzleController,
    RecordController,
    RoomController,
    WordController
  ]});

  try {
      const port = process.env.APP_PORT || 3000;
      const host = process.env.APP_HOST || "localhost";
      await server.listen(port, host);
      console.log(`Server started on http://${host}:${port}`);
    } catch (error) {
      server.log.error(error);
      process.exit(1);
    }
  })
  .catch((error) => console.log(error));
