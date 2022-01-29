import connect, { Room } from ".";

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
  console.log("insert", b);
  console.timeEnd();

  knex.destroy();
})();
