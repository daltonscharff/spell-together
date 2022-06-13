import { PostgrestError } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { Room } from "../types/supabase";
import { supabase } from "../utils/supabaseClient";

export const defaultRoom: Room = {
  id: "",
  created_at: "",
  last_played: "",
  shortcode: "",
};

export const useRoom = (shortcode: string) => {
  const [room, setRoom] = useState<Room>(defaultRoom);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  useEffect(() => {
    async function loadRooms() {
      setLoading(true);
      const { data, error } = await supabase
        .from<Room>("room")
        .select("*")
        .eq("shortcode", shortcode);
      if (data) setRoom(data[0]);
      if (error) setError(error);
      setLoading(false);
    }

    if (shortcode) {
      loadRooms();
    }
  }, [shortcode]);

  return {
    room,
    loading,
    error,
  };
};
