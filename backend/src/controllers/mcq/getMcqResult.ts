import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

type Options = {
    [key: string]: {
        isCorrect: boolean;
        questionId: string;
        optionId: number;
    };
};

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

    const options: Options = {};

    results.forEach(result => {
        options[result.questionId] = {
            isCorrect: result.isCorrect,
            questionId: result.questionId,
            optionId: result.optionId
        };
    });


    res.status(200).send({ data: options });
}