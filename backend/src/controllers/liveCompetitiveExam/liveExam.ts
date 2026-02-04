import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";
import bcrypt from "bcrypt";

export const liveExam = async (req: FastifyRequest, res: FastifyReply) => {

    const { roomName, subjectName, roomPassword, totalParticipant } = req.body as { roomName: string, subjectName: string, roomPassword: string, totalParticipant: number }

    const { userId } = req.user as { userId: number };

    if (!req.body) {
        return res.send({ message: "Something went wrong. Please try again later." })
    }
    const hashPassword = await bcrypt.hash(roomPassword, 15)

    const totalParticipantToNumber = Number(totalParticipant)

    const createRoom = await prisma.liveExamRoom.createMany(
        {
            data: {
                roomName: roomName,
                subjectName: subjectName,
                totalParticipant: totalParticipantToNumber,
                roomPassword: hashPassword,
                userId: userId
            }
        }
    )

    if (!createRoom) {
        return res.status(400).send({ message: "Failed to create room." })
    }

    res.status(201).send({ message: "Room created successful." })

}