import { db } from "../prisma/db";
import logger from "./logger";

async function deleteRooms(olderThan: Temporal.Instant) {
  const deletedRooms = await db.orm.public.Room.where((r) =>
    r.lastPlayed.lt(olderThan),
  ).deleteAll();
  return deletedRooms;
}

const ROOM_RETENTION_DAYS =
  process.env.CRON_ROOM_RETENTION_DAYS &&
  parseInt(process.env.CRON_ROOM_RETENTION_DAYS, 10);

const today = Temporal.Now.instant();

if (!ROOM_RETENTION_DAYS) {
  throw new Error("CRON_ROOM_RETENTION_DAYS is not set");
}

const deletedRooms = await deleteRooms(
  today.subtract({ hours: ROOM_RETENTION_DAYS * 24 }),
).catch((err) => {
  logger.error("Error deleting rooms:", err);
});
if (deletedRooms) {
  logger.info(
    `Deleted ${deletedRooms.length} rooms older than ${ROOM_RETENTION_DAYS} days`,
  );
}

await db.close();
