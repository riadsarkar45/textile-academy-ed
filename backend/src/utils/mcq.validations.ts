
export const validateMcq = (mcq: any) => {
    const options = [mcq.optionA, mcq.optionB, mcq.optionC, mcq.optionD]
    let errors = [];
    if(!mcq.question) errors.push("Question is missing.")
    if(!mcq.correctAnswer) errors.push("Correct ans is missing form options.")
    if(options.some(opt => !opt)) errors.push("Option missing.")
    if(!options.includes(mcq.correctAnswer))
        errors.push("Correct is not in options.")
    return errors;
}