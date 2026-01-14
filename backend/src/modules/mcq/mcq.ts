import { FastifyReply, FastifyRequest } from "fastify";

export const createNewMcq = async (req: FastifyRequest, res: FastifyReply) => {
   return res.send({ message: "MCQ created successfully" });
}