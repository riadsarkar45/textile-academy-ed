type Options = {
    [key: string]: {
        isCorrect: boolean;
        questionId: string;
        optionId: number;
    };
};
interface Result {
    questionId: string;
    isCorrect: boolean;
    optionId: number;
}



export const mcqResults = (result: Result[]): Options => {
    const options: Options = {}
    if (!Array.isArray(result) || result.length === 0) {
        throw new Error("Invalid Input: Array Expected")
    }
    result.forEach((result: Result) => {
        options[result.questionId] = {
            isCorrect: result.isCorrect,
            questionId: result.questionId,
            optionId: result.optionId
        };
    })
    return options || {}
}