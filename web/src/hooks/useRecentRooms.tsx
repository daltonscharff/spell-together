import useLocalStorageState from "use-local-storage-state";

export function useRecentRooms() {
  const [recentRooms, setRecentRooms] = useLocalStorageState<string[]>(
    "recentRooms",
    {
      defaultValue: [],
    }
  );

  const pushToRecentRooms = (shortcode: string) => {
    const newRecentRoomArray = [...recentRooms].filter((c) => c !== shortcode);
    newRecentRoomArray.unshift(shortcode);
    setRecentRooms(newRecentRoomArray);
  };

  // TODO: add way to remove recent room

  return {
    recentRooms,
    pushToRecentRooms,
  };
}
