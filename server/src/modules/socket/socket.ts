import { Server } from "socket.io"

export function registerSocketHandlers(io: Server){

    io.on("connection", (socket) => {
      console.log(`✅ User Connected: ${socket.id}`);
    
      socket.on("disconnected", () => {
        console.log(`❌ User Disconnected: ${socket.id}`)
      });
    });
}