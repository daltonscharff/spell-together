import { db } from "../prisma/db.ts";
import logger from "./utils/logger.ts";

async function deleteRooms(olderThan: Temporal.Instant) {
  const deletedRooms = await db.orm.public.Room.where((r) =>
    r.lastPlayed.lt(olderThan)
  ).deleteAll();
  return deletedRooms;
}

async function removeRooms() {
  const ROOM_RETENTION_DAYS = process.argv[2] && parseInt(process.argv[2], 10);
  if (!ROOM_RETENTION_DAYS) {
    throw new Error("ROOM_RETENTION_DAYS must be passed in as an argument");
  }

  const today = Temporal.Now.instant();

  const deletedRooms = await deleteRooms(
    today.subtract({ hours: ROOM_RETENTION_DAYS * 24 }),
  ).catch(
    (err) => {
      logger.error("Error deleting rooms:", err);
    },
  );
  if (deletedRooms) {
    logger.info(
      `Deleted ${deletedRooms.length} rooms older than ${ROOM_RETENTION_DAYS} days`,
    );
    logger.debug(`Deleted rooms: ${deletedRooms}`);
  }

  await db.close();
}

if (import.meta.main) await removeRooms();

export default removeRooms;
