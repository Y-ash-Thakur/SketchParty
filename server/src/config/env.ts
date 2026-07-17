import dotenv from "dotenv"

dotenv.config();

export const env = {
    PORT: Number(process.env.PORT) || 5000,
    CLIENT_URL: process.env.CLIENT_URL || "http://localhost:3000"
};