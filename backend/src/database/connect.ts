import { FastifyInstance } from "fastify";
import prisma from "./prisma/prisma";

export const databaseConnect = (fastify: FastifyInstance) => {
    fastify.addHook("onReady", async () => {
        try {
            await prisma.$connect();
            fastify.log.info("Database connected successfully.");
        } catch (err) {
            fastify.log.error({ err }, "Database connection failed");
            process.exit(1); // Exit if DB connection fails
        }
    });

    // Graceful shutdown
    fastify.addHook("onClose", async () => {
        await prisma.$disconnect();
        fastify.log.info("Database disconnected.");
    });
}