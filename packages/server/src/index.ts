import { connect } from "@daltonscharff/spelling-bee-core";
import fastify from "fastify";
import socketio from "fastify-socket.io";

const server = fastify();
const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || "localhost";

async function main() {
  const promises = [];

  promises.push(connect({
    url: process.env.DATABASE_URL,
    logging: process.env.NODE_ENV === "development",
  }))

  server.register(socketio);
  promises.push(server.listen(port, host));

  try {
    await Promise.all(promises);
    console.log(`Server started on http://${host}:${port}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

main();
