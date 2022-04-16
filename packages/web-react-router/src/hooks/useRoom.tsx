import useSWR from "swr";
import fetcher from "../utils/fetcher";

export type Room = {
  shortcode: string;
  name: string | null;
  createdAt: string;
  lastPlayed: string;
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
      }[];
} | null;

export const useRoom = (shortcode: string) => {
  const { error, data } = useSWR<Room>(`/api/rooms/${shortcode}`, fetcher);

  return {
    loading: !(error || data),
  };
};
