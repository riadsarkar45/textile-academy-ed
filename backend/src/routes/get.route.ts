import { FastifyInstance } from "fastify";
import { getComPosts } from "../controllers/community/getComPosts";

export const getRoutes = async (fastify: FastifyInstance) => {
    fastify.get("/community-posts", getComPosts)
}