import http from "node:http";
import { Server } from "socket.io";
import { env } from "./config/env.js";

import app from "./app.js"
import { registerSocketHandlers } from "./modules/socket/socket.js"

//create http server from express app
const httpServer = http.createServer(app);

//initialize socket.io server
const io = new Server(httpServer, {
  cors: {
    origin: env.CLIENT_URL,
    credentials: true,
  },
});

registerSocketHandlers(io);

httpServer.listen(env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${env.PORT}`);
});