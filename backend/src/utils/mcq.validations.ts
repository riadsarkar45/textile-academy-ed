export const validateMcq = (mcq: any): string[] => {
  const errors: string[] = [];

  // Check if mcq is valid
  if (!mcq || typeof mcq !== 'object') {
    return ['Invalid item: expected an MCQ object'];
  }

  // Trim all fields
  const question = mcq.question?.trim() || '';
  const correctAnswer = mcq.correctAnswer?.trim() || '';
  const optionA = mcq.optionA?.trim() || '';
  const optionB = mcq.optionB?.trim() || '';
  const optionC = mcq.optionC?.trim() || '';
  const optionD = mcq.optionD?.trim() || '';

  const options = [optionA, optionB, optionC, optionD];

  // Required fields
  if (!question) errors.push("Question is missing.");
  if (!correctAnswer) errors.push("Correct answer is missing.");

  // Check for missing options
  if (options.some(opt => !opt)) errors.push("Option missing.");

  // Correct answer must match one of the options (case-insensitive)
  const lowerOptions = options.map(opt => opt.toLowerCase());
  if (!lowerOptions.includes(correctAnswer.toLowerCase())) {
    errors.push("Correct answer not in options.");
  }

  // Check for duplicate options (case-insensitive)
  const seen = new Set<string>();
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
