import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";
import bcrypt from "bcrypt";
export const register = async (req: FastifyRequest, res: FastifyReply) => {
    const { userEmail, userPassword } = req.body as { userEmail: string, userPassword: string }

    const userEmailExist = await prisma.users.findUnique(
        {
            where: { email: userEmail }
        }
    )

    if (userEmailExist) return res.status(200).send({ message: "Email exist", data: userEmailExist })
    const hashPassword = await bcrypt.hash(userPassword, 15)
    const createNewUser = await prisma.users.create(
        {
            data: {
                email: userEmail,
                password: hashPassword,
                name: "Riad Sarkar",
                username: "riadsarkar",
                role: "admin"
            }
        }
    )
    if (!createNewUser) return res.status(400).send({ message: "Something went wrong..." })

    res.status(201).send({ message: "User registered", data: { createNewUser } })
}