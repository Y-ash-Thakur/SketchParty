"use client"

import { useState } from "react"

import { Room } from "@/types/room";
import { socket } from "@/services/socket/socket"
import { SocketEvents } from "@/shared/socket-events"

export default function Lobby() {
    const[username, setUsername] = useState("");

    const[roomCode, setRoomCode] = useState("");

    const[room, setRoom] = useState<Room | null>(null);

    function handleCreateRoom(){
        if(!username.trim()){
            return;
        }

        socket.emit(SocketEvents.CREATE_ROOM, {
            username: username.trim()
        });
    }

    function handleJoinRoom(){
        if(!username.trim() || !roomCode.trim()) {
            return;
        }

        socket.emit(SocketEvents.JOIN_ROOM, {
            username: username.trim(),
            roomCode: roomCode.trim()
        })
    }

    return (
        <main>

            <h1>SketchParty Developer Lobby</h1>

            <br />

            <input
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />

            <br />
            <br />

            <input 
                placeholder="Room Code"
                value={roomCode}
                onChange={(event) => setRoomCode(event.target.value)}
            />

            <br />
            <br />

            <button>Create Room</button> 

            <button>Join Room</button>

            <hr />

            <h2>Current Room</h2>

            <p>{room?.code ?? "Not Connected"}</p>

            <h2>Players</h2>

            <ul>
                {room?.players.map((player) => (
                    <li key={player.socketId}>
                        {player.username}
                        {player.isHost && " 👑"}
                    </li>
                ))}
            </ul>
        </main>
    )
}