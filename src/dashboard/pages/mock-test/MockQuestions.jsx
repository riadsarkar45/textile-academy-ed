import { useEffect, useRef, useState } from "react";
import FixedBottomBar from "../../../components/FixedBottomBar";
import wrongAlertSound from "../../../assets/wrong-answer-buzzer.mp3";

const DURATION = 60;

const MockQuestions = ({ mcqQuestion }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [selectedOption, setSelectedOption] = useState(null);

  const timerRef = useRef(null);
  const wrongAudioRef = useRef(null);

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleNext = () => {
    stopTimer();
    if (currentIndex < mcqQuestion.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setTimeLeft(DURATION);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);

    // Play wrong sound if answer is incorrect
    if (!option.isCorrect && wrongAudioRef.current) {
      wrongAudioRef.current.currentTime = 0;
      wrongAudioRef.current.play().catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    if (!mcqQuestion || mcqQuestion.length === 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext();
          return DURATION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => stopTimer();
  }, [currentIndex, mcqQuestion]);

  if (!mcqQuestion || mcqQuestion.length === 0) {
    return <div className="text-center mt-10">No Questions Found</div>;
  }

  const progressPercent = (timeLeft / DURATION) * 100;
  let progressColor = "bg-green-500";
  if (timeLeft <= 40 && timeLeft > 20) progressColor = "bg-yellow-400";
  if (timeLeft <= 20) progressColor = "bg-red-500";

  const currentQuestion = mcqQuestion[currentIndex];

  return (
    <div className="w-[50rem] m-auto">
      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className={`h-full ${progressColor} transition-all duration-1000`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex justify-between mb-4 text-sm text-gray-600">
        <span>
          Question {currentIndex + 1} / {mcqQuestion.length}
        </span>
        <span>{timeLeft}s</span>
      </div>

      {/* Question Card */}
      <div className="bg-white p-5 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">{currentQuestion.question}</h2>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className={`w-full p-3 rounded-lg border transition
                ${
                  selectedOption
                    ? option.isCorrect
                      ? "bg-green-100 border-green-500"
                      : selectedOption.id === option.id
                      ? "bg-red-100 border-red-500"
                      : "bg-gray-50 border-gray-300"
                    : "bg-gray-50 hover:bg-gray-100 border-gray-300"
                }`}
            >
              {option.options}
            </button>
          ))}
        </div>

        {/* Hidden Wrong Answer Audio */}
        <audio ref={wrongAudioRef} src={wrongAlertSound} preload="auto" />
      </div>

      {/* Next Button */}
      <FixedBottomBar buttonAction={handleNext} buttonName="Next" />
    </div>
  );
};

export default MockQuestions;