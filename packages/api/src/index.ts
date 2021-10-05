import { connect } from "spelling-bee-core";
import fastify from "fastify";
import wordRoutes from "./routes/words";

const server = fastify({});
server.register(wordRoutes);

connect({
  url: process.env.DATABASE_URL,
  logging: process.env.NODE_ENV === "development",
})
  .then(async () => {
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
