import { FastifyInstance } from "fastify";

export async function routes(app: FastifyInstance) {
  app.get("/", async () => {
    return {
      status: "ok",
      message: "Textile Academy API running"
    };
  });
}
