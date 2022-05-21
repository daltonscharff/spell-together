export interface User {
  username: string;
  shortcode: string;
}

export interface Guess extends User {
  word: string;
}
