import prisma from "../../database/prisma/prisma";

export const liveLeaderboard = async (roomId: number) => {

    if (!roomId) return [];

    const leaderboard = await prisma.examAttempts.findMany({
        where: { roomId },
        select: {
            userId: true,
            correctAns: true,
            takenAt: true,
            user: { select: { name: true } }
        },
        orderBy: {
            correctAns: "desc"
        },
        take: 20
    });

    return leaderboard;
};
