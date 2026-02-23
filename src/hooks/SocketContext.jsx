import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import LoggedInUser from "./LoggedInUser";

export const useSocketConnection = () => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const { user } = LoggedInUser();

    useEffect(() => {
        const newSocket = io("http://127.0.0.1:5000", {
            withCredentials: true,
            transports: ["websocket"],
            auth: { userId: user?.id },
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        newSocket.on("connect", () => {
            console.log("✅ Socket connected:", newSocket.id);
            setIsConnected(true);
        });

        newSocket.on("disconnect", (reason) => {
            console.log("Socket disconnected:", reason);
            setIsConnected(false);
        });

        newSocket.on("connect_error", (error) => {
            console.error(" Connection error:", error.message);
            setIsConnected(false);
        });

        setSocket(newSocket);

        return () => {
            newSocket.removeAllListeners();
            newSocket.disconnect();
        };
    }, []);

    // Update socket auth when user changes (without reconnecting)
    useEffect(() => {
        if (socket && user) {
            socket.auth = { 
                ...socket.auth, 
                userId: user.id,
                username: user.username 
            };
            // ✅ Fixed: "userUpdate" not "connection"
            socket.emit("userUpdate", { userId: user.id, username: user.username });
        }
    }, [user, socket]);

    return { socket, isConnected };
};