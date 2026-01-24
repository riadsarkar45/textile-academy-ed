import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

export const mcqAttemptsController = async (req: FastifyRequest, res: FastifyReply) => {
    const { questionId, optionId, isCorrect, userId } = req.body as { questionId: string, optionId: string, isCorrect: boolean, userId: number };
    const stringUserIdToNumber = Number(userId)
    const stringOptionIdToNumber = Number(optionId)

    const ifExist = await prisma.mcqSubmission.findFirst(
        {
            where: {
                userId: stringUserIdToNumber,
                questionId: questionId,
            }
        }
    )
    if (ifExist) {
        return res.status(403).send({ message: "Already answered" })
    }

    const insertUserSubmission = await prisma.mcqSubmission.create(
        {
            data: {
                questionId: questionId,
                optionId: stringOptionIdToNumber,
                isCorrect: isCorrect,
                userId: stringUserIdToNumber
            }
        }
    )

    if (!insertUserSubmission) {
        return res.status(403).send({ message: "Submission Failed" })
    }

    res.status(200).send({ message: "Submission saved." })
}