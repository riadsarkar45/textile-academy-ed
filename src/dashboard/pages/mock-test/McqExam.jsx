import { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/Axios";
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router";
const McqExam = ({ examQuestion, setSelectedOption,selectedOption }) => {
    // const [selectedOption, setSelectedOption] = useState({});
    const [result, setResult] = useState({ correct: 0, incorrect: 0 });
    const axiosPublic = useAxiosPublic();
    const handleOptionSelect = async (questionId, optionId, isCorrect) => {
        setSelectedOption(prev => ({
            ...prev,
            [questionId]: { optionId, isCorrect, questionId }
        }));

    };
    console.log(selectedOption);
    useEffect(() => {


        let correct = 0;
        let incorrect = 0;

        Object.values(selectedOption).forEach(ans => {
            if (ans.isCorrect) correct++;
            else incorrect++;
        });

        setResult({ correct, incorrect });
    }, [selectedOption]);

    useEffect(() => {
        const fetchExamQuestions = async () => {
            try {
                const res = await axiosPublic.get("/mcq/results")
                setSelectedOption(res.data.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchExamQuestions();
    }, [])


    return (
        <div className="w-[50rem] m-auto">
            <div className="flex justify-between gap-2 mb-2 ">
                <div>
                    <Link to="/live-exam/mcq"><button className="flex bg-green-500 text-green-600 bg-opacity-15 p-2 border rounded-lg items-center gap-2"><FaArrowAltCircleLeft /></button></Link>
                </div>
                <div className="flex gap-2">
                    <p className="flex bg-green-500 text-green-600 bg-opacity-15 p-2 border rounded-lg items-center gap-2"><TiTick /> {result.correct}</p>
                    <p className="flex bg-red-500 text-red-600 bg-opacity-15 p-2 border rounded-lg items-center gap-2"><ImCross /> {result.incorrect}</p>
                </div>

            </div>
            <h2>Bangla mcq test</h2>
            {
                examQuestion?.map((question, qIndex) => {
                    const selectedOpt = selectedOption[question.id] || {};
                    return (
                        <div
                            key={qIndex}
                            className={
                                `${qIndex === examQuestion.length - 1 ? 'mb-[10rem]' : 'mb-2'}
                                 ${Number(question.id) === Number(selectedOpt.questionId) ? 'bg-gray-300 bg-opacity-20' : 'bg-white'} p-5 border rounded-lg `
                            }
                        >
                            <h2 className="mb-4">{qIndex + 1}. {question.question}</h2>
                            <div className="grid grid-cols-2 gap-5 rounded-lg p-3">
                                {
                                    question.options?.map((option, oIndex) => {
                                        const isUserAnsweredThisQuestion = Number(question.id) === Number(selectedOpt.questionId);
                                        const isSelected = option.id === selectedOpt.optionId;
                                        // const isCorrectOption = option.isCorrect;
                                        // const userSelectedWrong = isUserAnsweredThisQuestion && !selectedOpt.isCorrect;

                                        return (
                                            <button
                                                key={oIndex}
                                                disabled={isUserAnsweredThisQuestion}
                                                onClick={() => handleOptionSelect(question.id, option.id, option.isCorrect)}
                                                className={` ${isSelected && 'bg-yellow-200'} bg-gray-300 p-3 flex items-start rounded-lg  ${isUserAnsweredThisQuestion ? 'cursor-not-allowed' : 'cursor-pointer'
                                                    }`}
                                            >
                                                {oIndex + 1}. {option.options}
                                            </button>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default McqExam; 