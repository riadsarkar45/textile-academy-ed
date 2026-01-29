import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

export const getMcqs = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const { subjectId, yearId } = req.params as { subjectId: number, yearId: number }
        const convertSubjectIdToNumber = Number(subjectId)
        const convertYearIdToNumber = Number(yearId)
        const getMcqs = await prisma.mcqQuestions.findMany(
            {
                where: { subjectId: convertSubjectIdToNumber, questionYearId: convertYearIdToNumber, isActive: true },

                select: {
                    question: true,
                    options: true,
                    id: true
                }
            }
        )
        if (getMcqs.length < 1) {
            return res.status(404).send({ message: "No MCQs found." })
        }
        res.status(200).send({ mcqs: getMcqs })
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}