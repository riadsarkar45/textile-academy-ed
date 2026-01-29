import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";
import { mcqResults } from "../../utils/mcq-results";


export const McqResult = async (req: FastifyRequest, res: FastifyReply) => {
    const results = await prisma.mcqSubmission.findMany(
        {
            where: {
                userId: 1
            }
        }
    )
    if (results.length === 0) {
        return res.status(404).send({ message: "No results found" })
    };

    const result = mcqResults(results)
    if (Object.values(result).length === 0) {
        return res.status(404).send({ message: "No results to show" })
    }

    res.status(200).send({ data: result });
}