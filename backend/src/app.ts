import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";

import { postRoutes } from "./routes/post.route";
import { routes } from "./routes/home.route";
import { getRoutes } from "./routes/get.route";
import { databaseConnect } from "./database/connect";

export const app = Fastify({
  trustProxy: true, // 🔥 THIS IS REQUIRED
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname"
      }
    }
  }
});

/* plugins first */
app.register(rateLimit, {
  global: false
});

app.register(cors, {
  origin: true
});

/* routes after */
app.register(routes);
app.register(postRoutes);
app.register(getRoutes);

databaseConnect(app);
