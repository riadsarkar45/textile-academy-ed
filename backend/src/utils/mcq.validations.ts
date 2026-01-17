// utils/mcq.validations.ts
export const validateMcq = (mcq: any): string[] => {
  const errors: string[] = [];

  // Guard against non-objects
  if (!mcq || typeof mcq !== 'object') {
    return ['Invalid item: expected an MCQ object'];
  }

  if (!mcq.question || mcq.question.trim() === '') {
    errors.push("Question is missing.");
  }

  if (!mcq.correctAnswer || mcq.correctAnswer.trim() === '') {
    errors.push("Correct ans is missing.");
  }

  const options = [mcq.optionA, mcq.optionB, mcq.optionC, mcq.optionD];
  
  // Check if any option is null, undefined, or empty string
  if (options.some(opt => opt === null || opt === undefined || opt === '')) {
    errors.push("Option missing.");
  }

  // Check if correctAnswer matches one of the options exactly
  if (!options.includes(mcq.correctAnswer)) {
    errors.push("Correct is not in options.");
  }

  return errors;
};