import { FastifyReply, FastifyRequest } from "fastify";

export const authenticate = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).send({ message: 'No token in cookies' });
    }

    // Verify token
    const decoded = req.server.jwt.verify(token);

    (req as any).user = decoded;

  } catch (err: any) {
    console.log(err, "JWT error");

    if (err.code === 'FAST_JWT_MALFORMED') {
      return res.status(400).send({ message: 'Malformed token' });
    }

    if (err.code === 'FAST_JWT_EXPIRED') {
      return res.status(401).send({ message: 'Token expired' });
    }

    return res.status(401).send({ message: 'Invalid token' });
  }
};
