import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";
import bcrypt from "bcrypt";
export const login = async (req: FastifyRequest, res: FastifyReply) => {
    const { email, password } = req.body as { email: string, password: string }
    const emailFound = await prisma.users.findUnique(
        {
            where: { email: email }
        }
    )
    if (emailFound && emailFound.password) {
        const isPasswordValid = await bcrypt.compare(password, emailFound.password)
        if (!isPasswordValid) return res.status(401).send({ message: "Invalid credentials" })
        const token = req.server.jwt.sign(
            {
                userEmail: emailFound.email,
                userName: emailFound.name,
                userRole: emailFound.role
            }
        )
        res.setCookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24
        }).status(200).send({ message: "Login Successful" })
    } else {
        return res.status(401).send({ message: "Something went wrong. Please don't try again later." });
    }
}