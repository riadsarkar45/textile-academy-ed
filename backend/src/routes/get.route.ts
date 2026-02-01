import { FastifyInstance } from "fastify";
import { getComPosts } from "../controllers/community/getComPosts";
import { getMcqs } from "../controllers/mcq/getMcq";
import { McqResult } from "../controllers/mcq/getMcqResult";
import { allSubjects } from "../controllers/subjects/all-subjects";
import { subjectWiseQuestion } from "../controllers/mcq/yearlySelectQustion";
import { fetchAttempts } from "../controllers/mcq/attempt";
import { authenticate } from "../controllers/auth/auth-plugin";
import { loggedInUser } from "../controllers/auth/logged-user";

export const getRoutes = async (fastify: FastifyInstance) => {
    fastify.get("/community/posts", {
        preHandler: authenticate
        // config: {
        //     rateLimit:
        //     {
        //         max: 3,
        //         timeWindow: "5 seconds"
        //     }
        // }
    }, getComPosts)

    fastify.get("/mcq/:subjectId/:yearId",
        {
            preHandler: authenticate,
            // config: {
            //   rateLimit: {
            //     max: 3,
            //     timeWindow: "5 seconds"
            //   }
            // }
        },
        getMcqs
    );


    fastify.get("/mcq/results", {
        preHandler: authenticate
        // config: {
        //     rateLimit: {
        //         max: 3,
        //         timeWindow: "5 seconds"
        //     }
        // }
    }, McqResult)

    fastify.get("/subjects/:examType?", { preHandler: authenticate }, allSubjects)

    fastify.get("/topics/:subjectId", { preHandler: authenticate }, subjectWiseQuestion)

    fastify.get("/attempts-history/:subjectId", { preHandler: authenticate }, fetchAttempts)

    fastify.get("/logged-in-user", { preHandler: authenticate }, loggedInUser)
}