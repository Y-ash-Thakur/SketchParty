import { roomManager } from "../room/room.instance.js";
import { Server } from "socket.io"
import { SocketEvents } from "../../shared/socket-events.js"

export function registerSocketHandlers(io: Server){

    io.on(SocketEvents.CONNECTION, (socket) => {
      console.log(`✅ User Connected: ${socket.id}`);

      socket.on(SocketEvents.CREATE_ROOM, ({username}) => {
        const room = roomManager.createRoom({
          socketId: socket.id,
          username,
        });

        socket.join(room.code);

        socket.emit(SocketEvents.ROOM_CREATED, room);

        console.log(`🏠 Room Created: ${room.code}`)
      })
    
      socket.on(SocketEvents.DISCONNECT, (reason) => {
        console.log(`❌ User Disconnected: ${socket.id} (${reason})`)
      });
    });
}