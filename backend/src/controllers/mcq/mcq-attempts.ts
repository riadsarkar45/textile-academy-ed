import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

export const mcqAttemptsController = async (req: FastifyRequest, res: FastifyReply) => {
  const userId = 1;
  const answers = req.body as Record<string, { optionId: string; isCorrect: boolean }>;

  try {
    const records = Object.entries(answers).map(([questionId, answer]) => ({
      userId,
      questionId,
      optionId: parseInt(answer.optionId, 10),
      isCorrect: answer.isCorrect,
    }));

    // ✅ Use 'data', and pass the array
    await prisma.mcqSubmission.createMany({ data: records });

    return res.status(201).send({ message: "Saved", count: records.length });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Save failed" });
  }
};