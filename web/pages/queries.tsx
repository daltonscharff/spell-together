import { useEffect, useState } from "react";
import { useRealtime } from "react-supabase";
import { supabase } from "../utils/supabaseClient";
import { definitions } from "../types/supabase";
import Link from "next/link";
import { useRooms } from "../hooks/useRooms";
import { useGuesses } from "../hooks/useGuesses";

export default function QueryPage() {
  // const [rooms, setRooms] = useState<definitions["room"][]>([]);
  // console.log("adding subscription", supabase.getSubscriptions());

  // useEffect(() => {
  //   const roomSubscription = supabase
  //     .from("room")
  //     .on("INSERT", (payload) => {
  //       console.log("Change received!", payload);
  //       setRooms((rooms) => [...rooms, payload.new]);
  //     })
  //     .subscribe();
  //   return () => {
  //     console.log("removing subscription");
  //     supabase.removeSubscription(roomSubscription);
  //   };
  // }, []);
  const { rooms, loading } = useRooms();
  const { guesses } = useGuesses("f70c2ac8-def9-4dc7-87f9-534124b156df");

  // loadRooms();

  return (
    <>
      <div>rooms: {loading && "Loading..."}</div>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>{room.shortcode}</li>
        ))}
      </ul>
      <div>Guesses:</div>
      <ul>
        {guesses.map((guess) => (
          <li key={guess.id}>{guess.word_id}</li>
        ))}
      </ul>
      <Link href="/">Go away</Link>
    </>
  );
}
