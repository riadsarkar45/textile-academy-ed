import { FastifyInstance } from "fastify";
import { createNewMcq } from "../modules/mcq/mcq";
export const postRoutes = (fastify: FastifyInstance) => {
    fastify.post("/new-mcq", {
        schema: {
            body: {
                type: "object",
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
}