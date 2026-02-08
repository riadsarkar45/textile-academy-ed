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

    const leaderboard = await prisma.examAttempts.findMany(
        {
            where: { userId: userIdToNumber },
            orderBy: { correctAns: "asc" },
            select: {
                wrongAns: true,
                correctAns: true,

                user: {
                    select: {
                        name: true,
                    }
                }

            },

        }
    )

    const subjectStats = await prisma.examAttempts.groupBy({
        by: ['subjectId'],
        where: { userId: userIdToNumber },

        _sum: {
            correctAns: true,
            wrongAns: true
        },
        _count: {
            id: true
        }
    });

    const subjects = await prisma.subjects.findMany({
        where: { id: { in: subjectStats.map(s => s.subjectId).filter((id): id is number => id !== null) } },
        select: {
            mcqQuestions: true,
            subjectName: true,
            id: true,
            examAttempt: {
                select: {
                    totalSkipped: true,
                    totalQuestion: true
                }
            }
        }
    });

    const subjectWiseStats = subjectStats.map(s => {
        if (!s.subjectId) {
            return {
                subjectId: null,
                subjectName: "Room Exam",
                totalCorrect: s._sum.correctAns || 0,
                totalWrong: s._sum.wrongAns || 0,
                attempts: s._count.id,
                totalQuestions: 0
            };
        }

        const subject = subjects.find(sub => sub.id === s.subjectId);
        return {
            subjectId: s.subjectId,
            subjectName: subject?.subjectName ?? "Unknown Subject",
            totalCorrect: s._sum.correctAns || 0,
            totalWrong: s._sum.wrongAns || 0,
            attempts: s._count.id,
            // totalSkipped: subject?.examAttempt.map((sk) => sk.totalSkipped),
            totalSkipped: subject?.examAttempt.reduce((acc, sk) => acc + (sk.totalSkipped || 0), 0) || 0
        };
    });


    if (!totalExamsAttempt && !leaderboard) {
        return res.send(
            {
                accuracy: 0,
                totalExamsAns: 0,
                totalExamsAttempt: 0,
                leaderboard: []
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
        leaderboard: leaderboard || [],
        subjectWiseStats: subjectWiseStats
    });
}