import { FastifyInstance } from "fastify";
import { createNewMcq } from "../controllers/mcq/add-mcq";
import { createNewCommunityPost } from "../controllers/community/createNewPost";
import { mcqAttemptsController } from "../controllers/mcq/mcq-attempts";
export const postRoutes = (fastify: FastifyInstance) => {
    fastify.post("/new-mcq", {
        schema: {
            body: {
                type: "array",
                required: ["question", "correctAnswer", "optionA", "optionB", "optionC", "optionD"],
                properties: {
                    question: { type: "string", minLength: 1 },
                    optionA: { type: "string", minLength: 1 },
                    optionB: { type: "string", minLength: 1 },
                    optionC: { type: "string", minLength: 1 },
                    optionD: { type: "string", minLength: 1 },
                    correctAnswer: { type: "string", minLength: 1 },
                },
                additionalProperties: false,
            }
        },

    }, createNewMcq)

    fastify.post("/create/community/post", {
        schema: {
            body: {
                type: "object",
                required: ["title", "content", "authorId"],
                properties: {
                    title: { type: "string" },
                    content: { type: "string" },
                    authorId: { type: "string" }
                },
                additionalProperties: false,
            }
        }
    }, createNewCommunityPost)

    fastify.post("/mcq/attempts", {
        schema: {
            body: {
                type: "object",
                required: ["questionId", "optionId", "isCorrect"],
                properties: {
                    questionId: { type: "string" },
                    optionId: { type: "string" },
                    isCorrect: { type: "boolean" },
                    userId: { type: "string" }
                }
            }
        }
    }, mcqAttemptsController);
}