import { EntityController } from "@fastify-resty/core";
import { Room } from "spelling-bee-core";

@EntityController(Room, '/rooms')
export default class RoomController {}