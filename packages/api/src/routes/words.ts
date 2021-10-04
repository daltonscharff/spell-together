import { Word } from "spelling-bee-core";

export default async function wordRoutes (server, options, done) {
    server.get("/words", async (request, reply) => {
        return Word.find();
    });
}