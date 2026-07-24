export type GameState = 
    | "LOBBY"
    | "COUNTDOWN"
    | "CHOOSING_WORD"
    | "DRAWING"
    | "ROUND_END"
    | "GAME_OVER";

export interface Game {
    roomId: string;

    gameState: GameState;

    currentRound: number;

    maxRounds: number;

    currentDrawerId: string;

    drawerIndex: number;

    currentWord: string;

    useWords: string[];

    timer: number;
}