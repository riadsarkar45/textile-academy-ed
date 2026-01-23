import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "../../database/prisma/prisma";

export const createNewCommunityPost = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const { title, content, authorId } = req.body as { title: string; content: string; authorId: number };

        if (!title || !content || !authorId) {
            return res.status(400).send({ error: "Missing required fields: title, content, authorId" });
        }
        const authorIdToNumber = Number(authorId)
        const createNewPost = await prisma.communityPosts.create(
            {
                data: {
                    title: title.trim(),
                    content: content.trim(),
                    authorId: authorIdToNumber,
                }
            }
        )

        if (!createNewPost) {
            return res.status(500).send({ error: "Failed to create community post" });
        }

        res.status(200).send({ success: "Post published." })
    } catch (error) {
        console.error("Error creating community post:", error);
        return res.status(500).send({ error: "Internal Server Error" });
    }
}