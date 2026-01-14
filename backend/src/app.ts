import cors from "@fastify/cors";
import { routes } from "./routes/home.route";

import Fastify from "fastify";

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


