import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

export const dashboardSummary = async (req: FastifyRequest, res: FastifyReply) => {
    const { userId } = req.user as { userId: string };
    if (!userId) return;

    const userIdToNumber = Number(userId)

    const totalExamsAns = await prisma.examAttempts.aggregate(
        {
            where: { userId: userIdToNumber },
            _sum: {
                correctAns: true,
                wrongAns: true,
            }
        }
    )
    const totalExamsAttempt = await prisma.examAttempts.count(
        {
            where: { userId: userIdToNumber },
        }
    )


    if (!totalExamsAttempt) {
        return res.send(
            {
                accuracy: 0,
                totalExamsAns: 0,
                totalExamsAttempt: 0,
            }
        )
    }


    const totalCorrect = totalExamsAns._sum.correctAns ?? 0;
    const totalWrong = totalExamsAns._sum.wrongAns ?? 0;

    const totalAnswers = totalCorrect + totalWrong;

    const accuracy = totalAnswers === 0 ? 0 : (totalCorrect / totalAnswers) * 100;



    res.send({
        accuracy: accuracy,
        totalExamsAns: totalExamsAns,
        totalExamsAttempt: totalExamsAttempt,
    });
}