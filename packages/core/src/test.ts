import connect, { Puzzle, Room } from ".";

(async () => {
  const knex = await connect();
  console.log("connected");

  console.time();
  const a = await Room.query();
  console.log("query", a);
  console.timeEnd();

  console.time();
  const b = await Room.query().insertAndFetch({
    name: "Test room",
  });
  console.log("insert room", b);
  console.timeEnd();

  console.time();
  const c = await Puzzle.query().insertAndFetch({
    date: "2022-01-29",
    outerLetters: ["a", "b", "c", "d", "e", "f"],
    centerLetter: "g",
    maxScore: 99,
  });
  console.log("insert puzzle", c);
  console.timeEnd();

  knex.destroy();
})();
