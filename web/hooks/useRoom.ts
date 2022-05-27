import { useEffect, useState } from "react";
import { Room } from "../types/supabase";
import { supabase } from "../utils/supabaseClient";

export const useRoom = (shortcode: string) => {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadRooms() {
      setLoading(true);
      const { data } = await supabase
        .from<Room>("room")
        .select("*")
        .eq("shortcode", shortcode);
      if (data) setRoom(data[0]);
      setLoading(false);
    }

    if (shortcode) {
      loadRooms();
    }
  }, [shortcode]);

  return {
    room,
    loading,
  };
};
