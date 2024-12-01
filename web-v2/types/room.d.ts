import type { BaseType } from "./baseType";
import type { UserId } from "./user";

export type RoomId = string;

export type Room = BaseType & {
  name?: string;
  users: UserId[];
  owner: UserId;
};
