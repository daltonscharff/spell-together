import useLocalStorageState from "use-local-storage-state";
import dayjs from "dayjs";

type RecentRoom = {
  roomId: string;
  shortcode: string;
  lastVisitedAt: string;
};

export function useRecentRooms() {
  const [recentRooms, setRecentRooms] = useLocalStorageState<RecentRoom[]>(
    "recentRooms",
    {
      defaultValue: [],
    }
  );

  const pushToRecentRooms = (roomId: string, shortcode: string) => {
    const room = {
      roomId,
      shortcode,
      lastVisitedAt: dayjs().format(),
    };

    const newRecentRoomArray = [...recentRooms].filter(
      (recentRoom) => recentRoom.shortcode !== room.shortcode
    );
    newRecentRoomArray.unshift(room);
    setRecentRooms(newRecentRoomArray);
  };

  // TODO: add way to remove recent room

  return {
    recentRooms,
    pushToRecentRooms,
  };
}
