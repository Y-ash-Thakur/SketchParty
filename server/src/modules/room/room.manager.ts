import { Player, Room } from "./room.types.js";
import { generateRoomCode } from "./room.utils.js";

export class RoomManager {
    private rooms = new Map<string, Room>();

    createRoom(host: Omit<Player, "isHost">): Room {
        let roomCode = generateRoomCode();

        while(this.rooms.has(roomCode)) {
            roomCode = generateRoomCode();
        }

        const room: Room = {
            code: roomCode,
            players: [
                {
                    ...host,
                    isHost: true,
                },
            ],
        };

        this.rooms.set(roomCode, room);
        return room;
    }
}