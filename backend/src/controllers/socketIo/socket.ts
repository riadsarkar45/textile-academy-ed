import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";
import { handleDisconnect, joinExamRoom } from "./join-exam-room";

let io: Server | null = null;

export const socketInit = (server: HTTPServer) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        socket.on("join-exam-room", ({ roomId, username, userId }) => {
            joinExamRoom(socket, roomId, username, userId);
        });

        socket.on("disconnect", () => {
            handleDisconnect(socket);
        });
    });

    return io;
};

export const getIO = (): Server => {
    if (!io) throw new Error("Socket.io not initialized!");
    return io;
};
