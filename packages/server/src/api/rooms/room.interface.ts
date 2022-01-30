export interface Room {
  createdAt: string;
  lastPlayed: string;
  shortcode: string;
  name?: string;
}

export interface Rooms {
  [key: number]: Room;
}
