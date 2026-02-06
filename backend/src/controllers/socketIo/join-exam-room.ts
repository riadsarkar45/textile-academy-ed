import { Socket } from "socket.io";

const socketUser = new Map<string, { userId: string; username: string; roomId: string }>();

export const joinExamRoom = (socket: Socket, roomId: string, userId: string, username: string) => {
    const fullRoomId = `exam-${roomId}`;

    socket.join(fullRoomId);

    socketUser.set(socket.id, { userId, username, roomId: fullRoomId });

    const room = socket.nsp.adapter.rooms.get(fullRoomId);
    const count = room ? room.size : 0;

    socket.nsp.to(fullRoomId).emit("room-user-count", count);

    socket.to(fullRoomId).emit("user-joined", {
        userId,
        username,
    });

};


export const handleDisconnect = (socket: Socket) => {
    const data = socketUser.get(socket.id);
    if (!data) return;

    const { userId, username, roomId } = data;

    socketUser.delete(socket.id);

    const room = socket.nsp.adapter.rooms.get(roomId);
    const count = room ? room.size : 0;

    socket.nsp.to(roomId).emit("room-user-count", count);

    socket.to(roomId).emit("user-left", { userId });

};
