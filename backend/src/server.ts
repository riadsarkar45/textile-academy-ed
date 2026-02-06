import { app } from "./app";
import { socketInit, getIO } from "./controllers/socketIo/socket";

const PORT = 5000;

const start = async () => {
  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server running on port ${PORT}`);
    
    socketInit(app.server);
    console.log("Socket.io initialized");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();

export { getIO };