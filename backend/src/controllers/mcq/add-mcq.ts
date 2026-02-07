import { FastifyReply, FastifyRequest } from "fastify";
import { validateMcq } from "../../utils/mcq.validations";
import prisma from "../../database/prisma/prisma";
import { subjectRecords, subjectTopicRecord, yearRecords } from "../../services/mcq.service";
import { randomUUID } from "crypto";
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
      const examType = mcqs[0]?.examType || "No exam type found";
      const examTopic = mcqs[0]?.examTopic || "No exam topic found";
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
      const subRecord = await subjectRecords(hasSubjectName, examType) // returns subject record id

      if (!subRecord) {
         return res.status(400).send({ error: "Subject record not found" });
      }

      const subjectId = subRecord;
      const convertYearToNumber = Number(year)
      const yearRecord = await yearRecords(convertYearToNumber, subjectId, examTitle)
      const topicRecord = await subjectTopicRecord(examTopic, subjectId)
      
      if(!topicRecord) return;
      const yearId = yearRecord;

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

         return {
            question: mcq.question,
            isActive: true,
            subjectId: subjectId,
            questionYearId: yearId,
            examType: mcq.examType,
            examTopicId: topicRecord,
            tempKey: randomUUID()

         }
      })

      if (prismaPayload.length === 0) return res.status(400).send({ error: "No MCQs to insert" });
      const results = await prisma.$transaction(
         prismaPayload.map((data) =>
            prisma.mcqQuestions.createMany({
               data,
            })
         )
      );
      const tempKeys = prismaPayload.map(m => m.tempKey);

      const insertedMcqs = await prisma.mcqQuestions.findMany({
         where: {
            tempKey: { in: tempKeys }
         }
      });
      const optionsData: {
         options: any; isCorrect: boolean; questionId: number;
      }[] = [];

      for (const mcq of insertedMcqs) {
         const originalMcq = mcqs.find(m => m.question === mcq.question)!;

         ['A', 'B', 'C', 'D'].forEach(label => {
            optionsData.push({
               options: originalMcq[`option${label}`],
               isCorrect: originalMcq.correctAnswer.trim().toLowerCase() === originalMcq[`option${label}`].trim().toLowerCase(),
               questionId: mcq.id
            });
         });
      }

      await prisma.mcqOptions.createMany({ data: optionsData });


      return res.status(201).send({
         message: "MCQs created successfully",
         data: results,
      });

   } catch (err) {
      console.error("Unexpected error:", err);
      return res.status(500).send({ error: "Internal server error" });
   }
};