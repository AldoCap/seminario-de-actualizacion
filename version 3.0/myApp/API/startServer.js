const { Server } = require("./server/server.js");
const { signInHandler } = require("./server/controllers/sessionHandler.js");

const nodeServer = new Server(3000);
