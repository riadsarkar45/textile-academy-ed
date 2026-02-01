import { FastifyInstance } from "fastify";
import { createNewMcq } from "../controllers/mcq/add-mcq";
import { createNewCommunityPost } from "../controllers/community/createNewPost";
import { mcqAttemptsController } from "../controllers/mcq/mcq-attempts";
import { register } from "../controllers/auth/register";
import { login } from "../controllers/auth/login";
export const postRoutes = (fastify: FastifyInstance) => {
  fastify.post("/new-mcq", {
    schema: {
      body: {
        type: "array",
        required: ["question", "correctAnswer", "optionA", "optionB", "optionC", "optionD", "year", "examTitle"],
        properties: {
          question: { type: "string", minLength: 1 },
          optionA: { type: "string", minLength: 1 },
          optionB: { type: "string", minLength: 1 },
          optionC: { type: "string", minLength: 1 },
          optionD: { type: "string", minLength: 1 },
          year: { type: "string", minLength: 1 },
          examTitle: { type: "string", minLength: 1 },
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

  fastify.post("/mcq/attempts/:subjectId", {
    schema: {
      body: {
        type: "object",
        minProperties: 1, // at least one answer
        patternProperties: {
          // Keys must be numeric strings (e.g., "101", "102")
          "^[0-9]+$": {
            type: "object",
            required: ["questionId", "optionId", "isCorrect"],
            properties: {
              questionId: {
                // Must match the key (e.g., key "101" → questionId: "101")
                type: "string",
                pattern: "^[0-9]+$"
              },
              optionId: {
                type: "string", // or "integer" if you change frontend to send numbers
                pattern: "^[0-9]+$"
              },
              isCorrect: { type: "boolean" }
            },
            additionalProperties: false
          }
        },
        additionalProperties: false
      }
    }
  }, mcqAttemptsController);

  fastify.post("/register", {
    schema: {
      body: {
        type: "object",
        required: ["userEmail", "userPassword",],
        properties: {
          userEmail: { type: "string", format: "email" },
          userPassword: { type: "string" }
        }
      }
    }
  }, register)

  fastify.post("/login", {
    schema: {
      body: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string" },
          password: { type: "string" },
        }
      }
    }
  }, login)
}