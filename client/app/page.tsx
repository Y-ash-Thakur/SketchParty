"use client"

import { useEffect } from "react";
import { socket } from "@/services/socket/socket";
import { SocketEvents } from "../../server/src/shared/socket-events.js";

export default function Home() {
  useEffect(() => {
    socket.connect();

    socket.emit(SocketEvents.CREATE_ROOM, {
      username: "Yash",
    });

    socket.on(SocketEvents.ROOM_CREATED, (room) => {
      console.log(room)
    })

    return () => {

      socket.off(SocketEvents.ROOM_CREATED);

      socket.disconnect();
    };
  },[]);

  return (
    <main>
      <h1>SketchParty</h1>
    </main>
  )
}