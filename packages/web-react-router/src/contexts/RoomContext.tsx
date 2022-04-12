// remove this file

import { createContext, PropsWithChildren, useContext, useState } from "react";

export type RoomContextProps = PropsWithChildren<{}>;

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

const defaultRoom: RoomType = {
  shortcode: null,
  name: null,
  createdAt: null,
  lastPlayed: null,
  puzzle: null,
  records: null,
};

export const RoomContext = createContext<[RoomType, (state: RoomType) => void]>(
  [defaultRoom, () => {}]
);

export const RoomProvider = (props: RoomContextProps) => {
  const [state, setState] = useState<RoomType>({
    ...defaultRoom,
    shortcode: localStorage.getItem("shortcode"),
  });
  return (
    <RoomContext.Provider value={[state, setState]}>
      {props.children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const [state, setState] = useContext(RoomContext);

  function setShortcode(shortcode: string) {
    loadRoom(shortcode);
    localStorage.setItem("shortcode", shortcode);
    setState({ ...state, shortcode });
  }

  function loadRoom(shortcode?: string) {
    if (shortcode === undefined) {
      shortcode = state.shortcode ?? "";
    }

    // load data from API
  }

  return {
    ...state,
    setShortcode,
    loadRoom,
  };
};
