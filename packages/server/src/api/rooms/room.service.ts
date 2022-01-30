import * as models from "@daltonscharff/spelling-bee-core";
import { Room, Rooms } from "./room.interface";

export async function findAll(): Promise<Rooms> {
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
