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

    joinRoom(
        roomCode: string,
        player: Omit<Player, "isHost">
    ): Room {
        const room = this.rooms.get(roomCode);

        if(!room){
            throw new Error("Room not found.");
        }

        const alreadyJoined = room.players.some(
            (existingPlayer) => existingPlayer.socketId === player.socketId
        );

        if(alreadyJoined){
            throw new Error("Player already joined.")
        }

        room.players.push({
            ...player,
            isHost: false,
        });

        return room;
    }

    removePlayer(socketId: string): Room | null {
        for(const [roomCode, room] of this.rooms) {

            const playerIndex = room.players.findIndex(
                (player) => player.socketId === socketId
            );

            if(playerIndex === -1){
                continue;
            }

            const wasHost = room.players[playerIndex].isHost;

            room.players.splice(playerIndex, 1);

            if(room.players.length === 0){
                this.rooms.delete(roomCode);

                console.log(`🗑️ Room ${roomCode} deleted.`);

                return null;
            }

            if(wasHost) {
                room.players[0].isHost = true;
                console.log(`👑 Host Transfered ${room.players[0].username}`);
            }

            return room;
        }
        return null;
    }
}

