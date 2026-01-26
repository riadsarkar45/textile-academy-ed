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

      console.log(mcqs);

      const prismaPayload = mcqs.map((mcq) => {
         const OPTION_LABELS = ['A', 'B', 'C', 'D'] as const;
         const options = OPTION_LABELS.map((label) => ({
            options: mcq[`option${label}`],
            isCorrect: mcq.correctAnswer === mcq[`option${label}`],
         }));

         return {
            question: mcq.question,
            isActive: true,
            options: {
               create: options,
            },
         }
      })

      if (prismaPayload.length === 0) return res.status(400).send({ error: "No MCQs to insert" });

      console.log(prismaPayload, "prisma payload");
      const results = await prisma.$transaction(
         prismaPayload.map((data) =>
            prisma.mcqQuestions.create({
               data,
               include: { options: true }
            })
         )
      );


     return res.status(201).send({
      message: "MCQs created successfully",
      count: results.length,
      data: results,
    });

   } catch (err) {
      console.error("Unexpected error:", err);
      return res.status(500).send({ error: "Internal server error" });
   }
};