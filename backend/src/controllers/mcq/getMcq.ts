import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

export const getMcqs = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const { subjectId, yearId, roomId } = req.query as { subjectId?: number, yearId?: number, roomId?: number }
        const whereClause: any = { isActive: true };

        if (
            (subjectId && !yearId) ||
            (!subjectId && yearId)
        ) {
            return res.status(400).send({
                message: "subjectId and yearId must be provided together"
            });
        }

        if (!roomId && !subjectId && !yearId) {
            return res.status(400).send({
                message: "Provide roomId OR subjectId+yearId"
            });
        }

        if (subjectId && yearId) {
            whereClause.subjectId = Number(subjectId);
            whereClause.questionYearId = Number(yearId);
        }

        if (roomId) {
            whereClause.roomId = Number(roomId);
        }


        const getMcqs = await prisma.mcqQuestions.findMany(
            {
                where: whereClause,

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