import { Server } from "socket.io";
import type { Server as HTTPServer } from "http";
import { joinExamRoom, handleDisconnect } from "./join-exam-room";

let io: Server | null = null;

export const socketInit = (server: HTTPServer) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log(" User connected:", socket.id);

        socket.on("join-exam-room", ({ roomId, username, userId }: { roomId: string; username: string, userId: string }) => {
            joinExamRoom(socket, roomId, username, userId);
        });

        socket.on("disconnect", () => {
            console.log(" User disconnected:", socket.id);
            handleDisconnect(socket)
        });

        socket.on("userUpdate", (data) => {
            console.log("User update:", data);
        });
    });

    return io;
};

export const getIO = (): Server => {
    if (!io) {
        throw new Error("Socket.io not initialized! Call socketInit first.");
    }
    return io;
};