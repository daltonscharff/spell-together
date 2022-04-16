export type RoomType = {
  shortcode: string | null;
  name: string | null;
  createdAt: string | null;
  lastPlayed: string | null;
  puzzle: {
    date: string;
    outerLetters: string[];
    centerLetter: string;
    maxScore: number;
  } | null;
  records:
    | {
        createdAt: string;
        username: string;
        word: string;
        pointValue: string;
        isPangram: boolean;
        definition: string | null;
        partOfSpeech: string | null;
        synonym: string | null;
      }[]
    | null;
};

export const useRoom = () => {
  // get data from API using SWR
  // include `loading` in return value

  return {};
};
