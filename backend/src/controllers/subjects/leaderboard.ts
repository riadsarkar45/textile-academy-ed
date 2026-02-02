import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

export const userLeaderboard = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const { subjectId } = req.params as { subjectId: string };
        const subId = Number(subjectId);

        if (isNaN(subId)) {
            return res.status(400).send({ error: "Invalid subject ID" });
        }

        // Step 1: Get best correctAns per user for this subject
        const bestAttempts = await prisma.examAttempts.groupBy({
            by: ['userId'],
            where: { subjectId: subId },
            _max: {
                correctAns: true
            }
        });

        if (bestAttempts.length === 0) {
            return res.status(404).send({ message: "No leaderboard found yet.." });
        }

        // Step 2: Fetch the attempt rows corresponding to max correctAns
        const leaderboard = await prisma.examAttempts.findMany({
            where: {
                OR: bestAttempts.map(b => ({
                    userId: b.userId,
                    correctAns: b._max.correctAns!
                }))
            },
            orderBy: [
                { correctAns: 'desc' },
                { wrongAns: 'asc' },
                { takenAt: 'asc' }
            ],
            distinct: ['userId'],
            take: 20,
            include: {
                user: {
                    select: { id: true, name: true }
                }
            }
        });



        res.status(200).send({ leaderboard });

    } catch (err) {
        console.error("Leaderboard error:", err);
        res.status(500).send({ error: "Internal server error" });
    }
};
