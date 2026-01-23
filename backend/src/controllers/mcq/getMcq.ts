import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

export const getMcqs = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const getMcqs = await prisma.mcqQuestions.findMany(
            {
                where: { isActive: true },
        
                select: {
                    question: true,
                    options: true,
                    
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