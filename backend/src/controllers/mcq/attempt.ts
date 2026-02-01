import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

export const fetchAttempts = async (req: FastifyRequest, res: FastifyReply) => {
    const { subjectId } = req.params as { subjectId: Number }
    const { userId } = req.user as { userId: number }
    const convertToNumber = Number(subjectId)
    // const userId = 1;
    try {
        const attempts = await prisma.examAttempts.findMany(
            {
                where: { subjectId: convertToNumber, userId: userId },
                select: {
                    id: true,
                    correctAns: true,
                    wrongAns: true,
                    takenAt: true
                }
            }
        )
        if (attempts.length === 0) return res.status(404).send({ message: "No attempt found" })
        res.status(200).send({ data: attempts })
    } catch (e) {
        console.log(e);
    }
}