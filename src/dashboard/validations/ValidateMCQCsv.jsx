const validateMcq = (mcq) => {
  const options = [mcq.optionA, mcq.optionB, mcq.optionC, mcq.optionD];
  let errors = [];

  if (!mcq.question) errors.push("Question missing");
  if (!mcq.correctAnswer) errors.push("Correct answer missing");
  if (options.some(opt => !opt)) errors.push("Option missing");
  if (!options.includes(mcq.correctAnswer))
    errors.push("Correct answer not in options");

  return errors;
};

export default validateMcq;