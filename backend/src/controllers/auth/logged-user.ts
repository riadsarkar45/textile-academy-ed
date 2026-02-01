import { FastifyReply, FastifyRequest } from "fastify";

export const loggedInUser = async (req: FastifyRequest, res: FastifyReply) => {
    const user = req.user;
    if (!user) return res.status(401).send({ message: "No user found" });
    return res.status(200).send({ user: user })
}