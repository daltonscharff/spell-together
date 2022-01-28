export interface Room {
  code: string;
  name?: string;
}

export interface Rooms {
  [key: number]: Room;
}
