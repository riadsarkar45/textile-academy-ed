import { FastifyInstance } from "fastify";
import { getComPosts } from "../controllers/community/getComPosts";
import { getMcqs } from "../controllers/mcq/getMcq";

export const getRoutes = async (fastify: FastifyInstance) => {
    fastify.get("/community/posts", {
        config: {
            rateLimit:
            {
                max: 3,
                timeWindow: "5 seconds"
            }
        }
    }, getComPosts)

    fastify.get("/mcq", {
        config: {
            rateLimit: {
                max: 3,
                timeWindow: "5 seconds"
            }
        }
    }, getMcqs)
}