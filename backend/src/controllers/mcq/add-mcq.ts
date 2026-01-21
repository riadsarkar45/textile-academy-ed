import { FastifyReply, FastifyRequest } from "fastify";
import { validateMcq } from "../../utils/mcq.validations";
import prisma from "../../database/prisma/prisma";

export const createNewMcq = async (req: FastifyRequest, res: FastifyReply) => {
   try {
      const body = req.body;

      if (!Array.isArray(body)) {
         return res.status(400).send({ error: "Expected an array of MCQs" });
      }

      const mcqs = body as Array<Record<string, any>>;

      // Validate each
      const validationErrors = [];
      for (let i = 0; i < mcqs.length; i++) {
         const errors = validateMcq(mcqs[i]);
         if (errors.length > 0) {
            validationErrors.push({ index: i, errors });
         }
      }
      if (validationErrors.length > 0) {
         return res.status(400).send({ errors: validationErrors });
      }

      // Remove frontend-only fields
      const cleanMcqs = mcqs.map(({ selectedOption, ...rest }) => rest);
      // Transform to Prisma format
      const prismaPayload = cleanMcqs.map((mcq) => { 
         const optionMap = {
            A: mcq.optionA,
            B: mcq.optionB,
            C: mcq.optionC,
            D: mcq.optionD,
         };
         return {
            question: mcq.question,
            isActive: true,
            options: {
               create: Object.entries(optionMap).map(([label, text]) => ({
                  options: text,
                  isCorrect: label === mcq.correctAnswer,
               })),
            },
         };
      });

      // Save
      await prisma.$transaction(
         prismaPayload.map((data) =>
            prisma.mcqQuestions.create({ data })
         )
      );

      return res.status(201).send({
         message: "MCQs created successfully",
         count: prismaPayload.length,
      });

   } catch (err) {
      console.error("Unexpected error:", err);
      return res.status(500).send({ error: "Internal server error" });
   }
};