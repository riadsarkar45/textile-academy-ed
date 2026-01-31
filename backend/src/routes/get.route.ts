import { FastifyInstance } from "fastify";
import { getComPosts } from "../controllers/community/getComPosts";
import { getMcqs } from "../controllers/mcq/getMcq";
import { McqResult } from "../controllers/mcq/getMcqResult";
import { allSubjects } from "../controllers/subjects/all-subjects";
import { subjectWiseQuestion } from "../controllers/mcq/yearlySelectQustion";
import { fetchAttempts } from "../controllers/mcq/attempt";

export const getRoutes = async (fastify: FastifyInstance) => {
    fastify.get("/community/posts", {
        // config: {
        //     rateLimit:
        //     {
        //         max: 3,
        //         timeWindow: "5 seconds"
        //     }
        // }
    }, getComPosts)

    fastify.get("/mcq/:subjectId/:yearId", {
        // config: {
        //     rateLimit: {
        //         max: 3,
        //         timeWindow: "5 seconds"
        //     }
        // }
    }, getMcqs)

    fastify.get("/mcq/results", {
        // config: {
        //     rateLimit: {
        //         max: 3,
        //         timeWindow: "5 seconds"
        //     }
        // }
    }, McqResult)

    fastify.get("/subjects/:examType?", allSubjects)

    fastify.get("/topics/:subjectId", subjectWiseQuestion)

    fastify.get("/attempts-history/:subjectId", fetchAttempts)
}