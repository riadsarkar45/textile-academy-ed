import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import fastifyJwt from '@fastify/jwt';
import { postRoutes } from "./routes/post.route";
import { routes } from "./routes/home.route";
import { getRoutes } from "./routes/get.route";
import { databaseConnect } from "./database/connect";
import fastifyCookie from '@fastify/cookie';
export const app = Fastify({
  trustProxy: true,
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
app.register(fastifyCookie)
const jwtSecret = process.env.JWT_SECRET_TOKEN;
if (!jwtSecret) {
  throw new Error("JWT_SECRET environment variable is not set");
}
app.register(fastifyJwt, {
  secret: jwtSecret,
  verify: {
    extractToken: (req) => {
      return req.cookies?.token;
    }
  }
})

app.register(cors, {
  origin: "http://localhost:5173",
  credentials: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

/* routes after */
app.register(routes);
app.register(postRoutes);
app.register(getRoutes);

databaseConnect(app);
