import type { BaseType } from "./baseType";

export type UserId = string;

export type User = BaseType & {
  email: string;
  firstName?: string;
  lastName?: string;
};
