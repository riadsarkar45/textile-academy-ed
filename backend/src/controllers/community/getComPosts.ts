import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

export const getComPosts = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const getCommunityPosts = await prisma.communityPosts.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        if (getCommunityPosts.length < 1) {
            return res.status(404).send({ message: "No posts found." })
        }
        res.status(200).send({ posts: getCommunityPosts })
    } catch (e) {
        console.log(e);
    }
}