import { FastifyReply, FastifyRequest } from "fastify";

export const authenticate = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).send({ message: 'No token in cookies' });
        }
        const decode = req.server.jwt.verify(token);
        (req).user = decode
    } catch (e) {
        console.log(e);
    }
}