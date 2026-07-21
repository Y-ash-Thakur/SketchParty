"use client"

import { useState, useEffect } from "react"

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
            roomCode: roomCode.trim(),
        })
    }

    useEffect(() => {
        socket.connect();
        socket.on(SocketEvents.ROOM_CREATED, (room) => {
            setRoom(room);
        });

        socket.on(SocketEvents.ROOM_JOINED, (room) => {
            setRoom(room);
        });

        return () => {
            socket.off(SocketEvents.ROOM_CREATED);
            socket.off(SocketEvents.ROOM_JOINED);
        };
    },[])

    const host = room?.players.find(
        (player) => player.isHost
    );

    const playerCount = room?.players.length ?? 0;

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

            <button onClick={handleCreateRoom}>Create Room</button> 

            <br />
            <br />

            <button onClick={handleJoinRoom}>Join Room</button>

            <hr />

            <h2>Room Information</h2>

            <p>
                <strong>Room Code</strong>{" "}
                {room?.code ?? "Not Connected"}
            </p>

            <p>
                <strong>Host</strong>{" "}
                {host?.username ?? "-"}
            </p>

            <p>
                <strong>Players</strong>{" "}
                {playerCount} / 8
            </p>

            <h2>Players</h2>

            <ul>
                {room?.players.map((player) => (
                    <li key={player.socketId}>
                        {player.isHost ? "👑" : "🙂"}
                        {player.username}
                    </li>
                ))}
            </ul>

            <hr />

            <h3>Status</h3>

            <p>
                {playerCount < 2
                ? "Waiting for more players to join...."
                : "Ready to start the game!"
                }
            </p>

            <hr />
            <button>
                Start Game
            </button>

            <button>
                Leave Room
            </button>
        </main>
    )
}