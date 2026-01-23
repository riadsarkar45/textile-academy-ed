import { useState } from "react";

const McqExam = ({ examQuestion }) => {
    const [selectedOption, setSelectedOption] = useState({});
    const handleOptionSelect = (questionId, optionId, isCorrect) => {
        setSelectedOption(prev => ({
            ...prev,
            [questionId]: { optionId, isCorrect, questionId } // 🔥 dynamic key
        }));
    };

    return (
        <div className="w-[50rem] m-auto">
            <h2>Bangla mcq test</h2>
            {
                examQuestion?.map((question, qIndex) => {
                    const selectedOpt = selectedOption[question.id] || {};
                    return (
                        <div
                            key={qIndex}
                            className={
                                `${qIndex === examQuestion.length - 1 ? 'mb-[10rem]' : 'mb-2'}
                                 ${question.id === selectedOpt.questionId ? 'bg-gray-300 bg-opacity-20' : 'bg-white'} p-5 border rounded-lg `
                            }
                        >
                            <h2 className="mb-4">{qIndex + 1}. {question.question}</h2>
                            <div className="grid grid-cols-2 gap-5 rounded-lg p-3">
                                {question.options?.map((option, oIndex) => (
                                    <span key={oIndex} onClick={() => handleOptionSelect(question.id, option.id, option.isCorrect)} className={
                                        `${selectedOpt.isCorrect && option.id === selectedOpt.optionId && 'bg-green-500'}
                                        ${option.id === selectedOpt.optionId && !selectedOpt.isCorrect && 'bg-red-500'} bg-gray-200 p-3 rounded-lg`}>
                                        {oIndex + 1}. {option.options}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default McqExam; 