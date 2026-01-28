const validateMcq = (mcq) => {
  let errors = [];

  // Trim all fields first
  const question = mcq.question?.trim();
  const correctAnswer = mcq.correctAnswer?.trim();
  const subject = mcq.subject?.trim();
  const optionA = mcq.optionA?.trim();
  const optionB = mcq.optionB?.trim();
  const optionC = mcq.optionC?.trim();
  const optionD = mcq.optionD?.trim();

  // Required fields
  if (!question) errors.push("Question missing");
  if (!correctAnswer) errors.push("Correct answer missing");
  if (!subject) errors.push("Subject is required");

  // Options array
  const options = [optionA, optionB, optionC, optionD];

  // Check for missing option
  if (options.some(opt => !opt)) errors.push("Option missing");

  // Correct answer must be in options (ignoring spaces and case)
  const lowerOptions = options.map(opt => opt.toLowerCase());
  if (!lowerOptions.includes(correctAnswer.toLowerCase())) {
    errors.push("Correct answer not in options");
  }

  // Check for duplicate options (ignoring case and spaces)
  const seen = new Set();
  for (const opt of options) {
    const val = opt.toLowerCase();
    if (seen.has(val)) {
      errors.push(`Duplicate option found: '${opt}'`);
      break; // stop at first duplicate
    }
    seen.add(val);
  }

  return errors;
};

export default validateMcq;
