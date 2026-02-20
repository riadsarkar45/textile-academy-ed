import { Socket } from "socket.io";

const socketUser = new Map<string, { userId: string; username: string; roomId: string }>();


export const joinExamRoom = (socket: Socket, roomId: string, username: string, userId: string) => {

    const roomName = `exam_${roomId}`;

    socket.join(roomName);

    console.log(`${username} joined ${roomName}`);

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

export const handleUserSubmission = (socket: Socket, roomId: string, userId: string, username: string) => {
    // if (!leaderBoard) return;
    // socket.nsp.to(roomId).emit("leaderboard-update", leaderBoard);
    // console.log("clicked");
}
