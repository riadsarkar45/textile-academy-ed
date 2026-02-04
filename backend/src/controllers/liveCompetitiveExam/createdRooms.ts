import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

export const createdRooms = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const rooms = await prisma.liveExamRoom.findMany(
            {
                select: {
                    roomName: true,
                    subjectName: true,
                    totalParticipant: true,
                }
            }
        )

        if (rooms.length === 0) {
            return res.status(404).send({ message: "No room created." })
        }

        res.send({ rooms: rooms })
    } catch (e) {
        console.log(e);
    }
}