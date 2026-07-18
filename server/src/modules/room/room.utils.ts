const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function generateRoomCode(length = 5): string {
    let code = "";

    for(let i = 0; i < length; i++){
        const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
        code += CHARACTERS[randomIndex]
    }
    return code;
}