import Fastify from "fastify";
import cors from "@fastify/cors";
import { postRoutes } from "./routes/post.route";
import { routes } from "./routes/home.route";
import { databaseConnect } from "./database/connect";
import { getRoutes } from "./routes/get.route";

export const app = Fastify({
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


app.register(cors, {
  origin: true
});
app.register(routes);
app.register(postRoutes);
app.register(getRoutes);
databaseConnect(app)


