import * as models from "@daltonscharff/spelling-bee-core";
import { Room } from "../interfaces";

export async function findAll(): Promise<Room[]> {
  return await models.Room.query();
}

export async function find(shortcode: string): Promise<Room> {
  return await models.Room.query()
    .where({
      shortcode,
    })
    .first();
}

export async function create(name: string): Promise<Room> {
  return await models.Room.query().insertAndFetch({
    name,
  });
}

export async function remove(shortcode: string): Promise<Room> {
  return await models.Room.query()
    .delete()
    .where({
      shortcode,
    })
    .returning("*")
    .first();
}

export async function updateByShortcode(
  shortcode: string,
  room: Partial<Room>
): Promise<Room> {
  delete room.id;
  delete room.createdAt;
  delete room.shortcode;
  return await models.Room.query()
    .patch(room)
    .where({ shortcode })
    .returning("*")
    .first();
}
