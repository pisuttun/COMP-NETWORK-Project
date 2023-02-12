import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";

const app = express.default();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
    socket.emit("your id", socket.id);
    socket.on("send message", (body) => {
        console.log(body);
        io.emit("message", body);
    });
});
const port = 8000;
server.listen(port, () => console.log(`Listening on port:${port}...`));
