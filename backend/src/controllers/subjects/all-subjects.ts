import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

export const allSubjects = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const subjects = await prisma.subjects.findMany(
            {
                select: {
                    id: true,
                    subjectName: true
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