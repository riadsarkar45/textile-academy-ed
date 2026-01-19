import { FastifyReply, FastifyRequest } from "fastify";
import { validateMcq } from "../../utils/mcq.validations";

export const createNewMcq = async (req: FastifyRequest, res: FastifyReply) => {
   try {
      const body = req.body;

      if (!Array.isArray(body)) {
         return res.status(400).send({ error: "Expected an array of MCQs" });
      }
      const mcqs = body as any[];
      const validationErrors: { index: number; errors: string[] }[] = [];

      for (let i = 0; i < mcqs.length; i++) {
         const errors = validateMcq(mcqs[i]);
         if (errors.length > 0) {
            validationErrors.push({ index: i, errors });
         }
      }
      if (validationErrors.length > 0) {
         console.log("Validation failed for some MCQs:", validationErrors);
         return res.status(400).send({ errors: validationErrors });
      }
      const cleanMcqs = mcqs.map(({ selectedOption, ...rest }) => rest);

      return res.status(201).send({
         message: "MCQs created successfully",
         data: cleanMcqs
      });

   } catch (err) {
      console.error("Unexpected error:", err);
      return res.status(500).send({ error: "Internal server error" });
   }
};