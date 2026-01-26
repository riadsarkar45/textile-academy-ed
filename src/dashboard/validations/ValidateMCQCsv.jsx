const validateMcq = (mcq) => {
  let errors = [];

  // Required fields
  if (!mcq.question || !mcq.question.trim()) errors.push("Question missing");
  if (!mcq.correctAnswer || !mcq.correctAnswer.trim()) errors.push("Correct answer missing");
  if (!mcq.subject || !mcq.subject.trim()) errors.push("Subject is required");

  // Only the 4 options
  const options = [mcq.optionA, mcq.optionB, mcq.optionC, mcq.optionD];

  // Check for missing option
  if (options.some(opt => !opt || !opt.trim())) errors.push("Option missing");

  // Correct answer must be in options
  if (!options.includes(mcq.correctAnswer)) errors.push("Correct answer not in options");

  // Check duplicates among options only
  const seen = new Set();
  for (const opt of options) {
    const val = opt.trim();
    if (seen.has(val)) {
      errors.push(`Duplicate option found: '${val}'`);
      break; // stop at first duplicate
    }
    seen.add(val);
  }

  return errors;
};

export default validateMcq;
