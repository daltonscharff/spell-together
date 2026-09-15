import { useEffect, useState } from "react";
import supabase from "../utils/supabase";
import { REALTIME_LISTEN_TYPES } from "@supabase/supabase-js";

export const Test = () => {
  const myChannel = supabase.channel("test", { config: { private: true } });
  const [broadcastReceived, setBroadcastReceived] = useState();

  useEffect(() => {
    supabase.realtime
      .setAuth()
      .then(() =>
        myChannel.subscribe(() => {
          console.log("subscribed to channel");
        })
      )
      .then(() =>
        myChannel
          .on(
            REALTIME_LISTEN_TYPES.BROADCAST,
            { event: "INSERT" },
            (payload: any) => {
              console.log("payload received", payload);
              setBroadcastReceived(payload);
            }
          )
          .subscribe()
      );
  }, []);

  async function onClick() {
    const res = await myChannel.send({
      type: "broadcast",
      event: "testEvent",
      payload: { hello: "world123" },
    });

    console.log("response:", res);
  }

  return (
    <div>
      <div>
        broadcast received:{" "}
        {broadcastReceived ? (
          JSON.stringify(broadcastReceived)
        ) : (
          <span className="text-gray-300">nothing yet...</span>
        )}
      </div>
      <button className="btn" onClick={onClick}>
        Send broadcast
      </button>
    </div>
  );
};
