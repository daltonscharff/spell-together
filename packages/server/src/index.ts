import { connect } from "@daltonscharff/spelling-bee-core";
import fastify from "fastify";
import socketio from "fastify-socket.io";

const server = fastify();
const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || "localhost";

async function main() {
  const dbPromise = connect({
    url: process.env.DATABASE_URL,
    logging: process.env.NODE_ENV === "development",
  });

  server.register(socketio, {
    cors: { origin: "*", methods: ["GET", "POST"] },
  });

  try {
    await server.ready();
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
  server.io.on("connection", onConnection);

  const fastifyPromise = server.listen(port, host);

  try {
    await Promise.all([dbPromise, fastifyPromise]);
    console.log(`Server started on http://${host}:${port}`);
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

/**
 * puzzle:read
 *
 * record:create
 *
 * room:create
 * room:update_name
 * room:view_members
 * room:view_activity
 * room:view_found_answers
 *
 * @param socket
 */
function onConnection(socket) {
  socket.on("hello", (payload) => {
    console.log(payload, "HELLO");
  });

  socket.on("puzzle:read", () => {
    console.log("puzzle:read");
  });
}

main();
