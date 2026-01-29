import { FastifyReply, FastifyRequest } from "fastify";

export const yearlyQuestion = async (req: FastifyRequest, res: FastifyReply) => {
    const year = req.params as { year: string };
    try{
        
    }catch(err){
        console.log(err);
    }
}