import { useEffect, useState } from "react";
import { definitions } from "../types/supabase";
import { supabase } from "../utils/supabaseClient";

export const useRooms = () => {
  const [rooms, setRooms] = useState<definitions["room"][]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRooms();
    console.log("adding subscription");
    const roomSubscription = supabase
      .from("room")
      .on("INSERT", (payload) => {
        console.log("Change received!", payload);
        addRooms(payload.new);
      })
      .subscribe();
    return () => {
      console.log("removing subscription");
      supabase.removeSubscription(roomSubscription);
    };
  }, []);

  async function loadRooms() {
    setLoading(true);
    const { data } = await supabase.from("room").select("*");
    if (data) setRooms(data);
    setLoading(false);
  }

  function addRooms(...newRooms: definitions["room"][]) {
    setRooms((rooms) => [...rooms, ...newRooms]);
  }

  return {
    rooms,
    loading,
  };
};
