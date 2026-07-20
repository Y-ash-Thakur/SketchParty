export interface Player {
    socketId: string;
    username: string;
    isHost: boolean;
}

export interface Room {
    code: string;
    players: Player[];
}