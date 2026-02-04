import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";
import bcrypt from "bcrypt";

export const joinRoom = async (req: FastifyRequest, res: FastifyReply) => {

    const { roomId, roomPassword } = req.body as { roomId: number, roomPassword: string };
    try {

        const roomIdToNumber = Number(roomId)

        const isRoomExist = await prisma.liveExamRoom.findUnique(
            {
                where: { id: roomIdToNumber },
                select: {
                    roomPassword: true,
                    id: true
                }
            }
        )

        if (!isRoomExist) {
            return res.status(404).send({ error: "Room not found" });
        }

        const isPasswordValid = await bcrypt.compare(roomPassword, isRoomExist.roomPassword)

        if (!isPasswordValid) {

            return res.send({ message: "Invalid password" })
        }

        res.status(201).send({ roomId: isRoomExist.id, message: "Room joined" })
    } catch (e) {
        console.log(e);
    }

}