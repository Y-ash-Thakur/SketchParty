export const SocketEvents = {
    CONNECTION: "connection",

    DISCONNECT: "disconnect",

    JOIN_ROOM: "join-room",

    ROOM_JOINED: "room-joined",

    CREATE_ROOM: "create-room",

    ROOM_CREATED: "room-created",

    LEAVE_ROOM: "leave-room",

    START_GAME: "start-game",

    DRAW: "draw",

    GUESS: "guess",

    CHAT_MESSAGE: "chat-message",

    GAME_STATE: "game-state",

    ERROR: "error",
} as const 