import type { Timestamp } from "firebase/firestore";

export type BaseType = {
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
