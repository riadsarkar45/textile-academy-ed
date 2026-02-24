import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

export const allSubjects = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const { examType } = req.params as { examType: string };
        const subjects = await prisma.subjects.findMany(
            {
                where: examType ? { examType } : {},
                select: {
                    id: true,
                    subjectName: true,
                    topics: true,
                    mcqQuestions:{
                        select: {
                            options: true,
                            question: true, 
                        }
                    },
                    
                    _count: {
                        select: { mcqQuestions: true, }
                    }
                }
            }
        )
        if (subjects.length === 0) {
            return res.status(400).send({ message: "No subjects found." })
        }

        res.status(200).send({ data: subjects })
    } catch (e) {
        console.log(e);
    }
}