import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

export const subjectWiseQuestion = async (req: FastifyRequest, res: FastifyReply) => {
    const { subjectId } = req.params as { subjectId: number };
    const convertStringIdToNumber = Number(subjectId)
    try {
        const questions = await prisma.questionYear.findMany(
            {
                where: { subjectId: convertStringIdToNumber },
                select: {
                    examTitle: true,
                    subjectId: true,
                    year: true,
                    id: true
                }
            }
        )
        return res.status(200).send({ data: questions })
    } catch (err) {
        console.log(err);
    }
}