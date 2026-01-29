import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

export const mcqAttemptsController = async (req: FastifyRequest, res: FastifyReply) => {
  const userId = 1;
  const answers = req.body as Record<string, { optionId: string; isCorrect: boolean }>;

  try {
    const LAST_ATTEMPT_ID = await prisma.examAttempts.create(
      {
        data: {
          userId,
        },
        select: { id: true }
      }
    )
    if (!LAST_ATTEMPT_ID) {
      return res.status(500).send({ error: "Could not create attempt record" });
    }
    const optionIds = Object.values(answers).map(answer => parseInt(answer.optionId, 10));
    const correctOptions = await prisma.mcqOptions.findMany(
      {
        where: { id: { in: optionIds } },
        select: { id: true, isCorrect: true }
      }
    )
    const correctMap = new Map(
      correctOptions.map(o => [o.id, o.isCorrect])
    );
    const attemptId = Number(LAST_ATTEMPT_ID.id);
    const records = Object.entries(answers).map(([questionId, answer]) => ({
      userId,
      questionId,
      optionId: parseInt(answer.optionId, 10),
      isCorrect: correctMap.get(Number(answer.optionId)) || false,
      attemptId
    }));

    await prisma.mcqSubmission.createMany({ data: records });
    

    return res.status(201).send({ message: "Saved", count: records.length });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Save failed" });
  }
};