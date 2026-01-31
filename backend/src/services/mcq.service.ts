import prisma from "../database/prisma/prisma"

export const subjectRecords = async (subjectName: string, examType: string) => {
    if (!subjectName && typeof subjectName !== "string") throw new Error("Subject name is missing")

    let records = await prisma.subjects.findUnique(
        {
            where: { subjectName: subjectName },
            select: { id: true }
        }
    )
    if (!records) {
        records = await prisma.subjects.create(
            {
                data: {
                    subjectName: subjectName,
                    examType: examType
                },
                select: { id: true }
            }
        )
    }
    return Number(records.id) || undefined
}

export const yearRecords = async (year: number, subjectId: number, examTitle: string) => {
    if (!year && typeof year !== "number") throw new Error("Number is missing or type mismatch")
    let yearRecord = await prisma.questionYear.findFirst(
        {
            where: { year: year, subjectId: subjectId },
            select: { id: true }
        }
    )
    if (!yearRecord) {
        yearRecord = await prisma.questionYear.create(
            {
                data: {
                    year: year,
                    examTitle: examTitle,
                    subjectId: subjectId,
                }
            }
        )
    }
    return yearRecord.id
}

export const subjectTopicRecord = async (topic: string, subjectId: number) => {
    if (!topic && !subjectId) throw new Error("Topic or Subject id is missing")
    let topicRecord = await prisma.topics.findFirst(
        {
            where: { topicTitle: topic },
            select: { id: true }
        }
    )
    if (!topicRecord) {
        topicRecord = await prisma.topics.create(
            {
                data: {
                    topicTitle: topic,
                    subjectId: subjectId
                },
                select: { id: true, topicTitle: true }
            }
        )
    }

    return Number(topicRecord.id)
}