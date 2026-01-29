import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";
import { mcqResults } from "../../utils/mcq-results";

export const mcqAttemptsController = async (req: FastifyRequest, res: FastifyReply) => {
  const userId = 1;
  const answers = req.body as Record<string, { optionId: string; isCorrect: boolean }>;
  const { subjectId } = req.params as { subjectId: number }
  const subjectIdToNumber = Number(subjectId)
  console.log(subjectIdToNumber, 'subject id');
  try {
    const LAST_ATTEMPT_ID = await prisma.examAttempts.create(
      {
        data: {
          userId,
          subjectId: subjectIdToNumber
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
    const correctMap = new Map(correctOptions.map(o => [o.id, o.isCorrect]));
    const attemptId = Number(LAST_ATTEMPT_ID.id);
    const records = Object.entries(answers).map(([questionId, answer]) => ({
      userId,
      questionId,
      optionId: parseInt(answer.optionId, 10),
      isCorrect: correctMap.get(Number(answer.optionId)) || false,
      attemptId
    }));

    await prisma.mcqSubmission.createMany({ data: records });

    const lastSubmittedOption = await prisma.mcqSubmission.findMany(
      {
        where: { attemptId: attemptId }
      }
    )

    const correctCount = lastSubmittedOption.filter(a => a.isCorrect).length;
    const wrongCount = lastSubmittedOption.filter(a => !a.isCorrect).length;
    const resultSummary = {
      correctAns: correctCount,
      wrongAns: wrongCount
    }

    if (lastSubmittedOption.length === 0) return res.status(404).send({ error: "Something went wrong." })
    await prisma.examAttempts.update(
      {
        where: { id: LAST_ATTEMPT_ID.id, userId: userId },
        data: {
          correctAns: resultSummary.correctAns,
          wrongAns: resultSummary.wrongAns
        }
      }
    )
    const submittedOptions = mcqResults(lastSubmittedOption)
    return res.status(201).send({ message: "Saved", lastSubmittedOption: submittedOptions, resultSummary: resultSummary });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Save failed" });
  }
};