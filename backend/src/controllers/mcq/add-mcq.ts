import { FastifyReply, FastifyRequest } from "fastify";
import { validateMcq } from "../../utils/mcq.validations";
import prisma from "../../database/prisma/prisma";

export const createNewMcq = async (req: FastifyRequest, res: FastifyReply) => {
   try {
      const body = req.body;

      if (!Array.isArray(body)) {
         return res.status(400).send({ error: "Expected an array of MCQs" });
      }

      const mcqs = body as Array<Record<string, any>>;
      const hasSubjectName = mcqs[0]?.subject || undefined;
      const year = mcqs[0]?.year || undefined;
      const examTitle = mcqs[0]?.examTitle || "No title found";
      const hasDifferentSubjects = mcqs.some(mcq => mcq.subject !== hasSubjectName)
      if (hasDifferentSubjects) {
         return res.status(400).send({
            error: "All MCQs must belong to the same subject",
            message: "Mixed subjects are not allowed in a single request"
         });
      }

      if (!hasSubjectName || typeof hasSubjectName !== 'string') {
         return res.status(400).send({ error: "Subject name is required in the first MCQ object" });
      }
      let subjectRecord = await prisma.subjects.findUnique({
         where: { subjectName: hasSubjectName },
         select: { id: true }
      });

      if (!subjectRecord) {
         subjectRecord = await prisma.subjects.create({
            data: { subjectName: hasSubjectName },
            select: { id: true }
         });
      }
      const subjectId = subjectRecord.id;

      const yearRecord = await prisma.questionYear.create({
         data: {
            year: year,
            subjectId: subjectRecord.id,
            examTitle: examTitle
         },
         select: { id: true }
      });
      const yearId = yearRecord.id;

      const validationErrors = [];
      for (let i = 0; i < mcqs.length; i++) {
         const errors = validateMcq(mcqs[i]);
         if (errors.length > 0) {
            validationErrors.push({ index: i, errors });
         }
      }
      if (validationErrors.length > 0) {
         return res.status(400).send({ errors: validationErrors });
      }


      const prismaPayload = mcqs.map((mcq) => {
         const OPTION_LABELS = ['A', 'B', 'C', 'D'] as const;
         const options = OPTION_LABELS.map((label) => ({
            options: mcq[`option${label}`].trim(),
            isCorrect: mcq.correctAnswer.trim().toLowerCase() === mcq[`option${label}`].trim().toLowerCase(),
         }));

         return {
            question: mcq.question,
            isActive: true,
            subjectId: subjectId,
            questionYearId: yearId,
            options: {
               create: options,
            },
         }
      })

      if (prismaPayload.length === 0) return res.status(400).send({ error: "No MCQs to insert" });

      const results = await prisma.$transaction(
         prismaPayload.map((data) =>
            prisma.mcqQuestions.create({
               data,
               include: { options: true }

            })
         )
      );

      return res.status(201).send({
         message: "MCQs created successfully",
         data: results,
      });

   } catch (err) {
      console.error("Unexpected error:", err);
      return res.status(500).send({ error: "Internal server error" });
   }
};