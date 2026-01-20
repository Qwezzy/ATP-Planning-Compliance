import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { QUIZ_DATA } from '../constants';

interface QuizProps {
  onComplete: (score: number) => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>(new Array(QUIZ_DATA.length).fill(0));
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const question = QUIZ_DATA[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_DATA.length) * 100;

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    const newScores = [...scores];
    newScores[currentQuestion] = question.values[index];
    setScores(newScores);
  };

  const handleNext = () => {
    if (selectedOption === null && scores[currentQuestion] === 0) {
      // Assuming 0 isn't a valid "selected" state unless explicitly chosen, 
      // but here 0 is a valid score value. We need to check if user interacted.
      // For simplicity, strict check:
      if (selectedOption === null) return; 
    }

    if (currentQuestion < QUIZ_DATA.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedOption(null);
    } else {
      const totalScore = scores.reduce((a, b) => a + b, 0);
      onComplete(totalScore);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      // Optional: reset selected option or restore it if we tracked selection index separately
      setSelectedOption(null); 
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-10 max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full mb-8">
        <div 
          className="bg-sky-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="mb-8">
        <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
          Question {currentQuestion + 1} of {QUIZ_DATA.length}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2 mb-6">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(index)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${
                selectedOption === index
                  ? 'border-sky-600 bg-sky-50 text-sky-900'
                  : 'border-slate-200 hover:border-sky-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="font-medium text-lg">{option}</span>
              {selectedOption === index && (
                <CheckCircle className="w-6 h-6 text-sky-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-slate-100">
        <button
          onClick={handlePrev}
          disabled={currentQuestion === 0}
          className={`flex items-center text-slate-500 font-medium hover:text-slate-900 transition-colors ${
            currentQuestion === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
            selectedOption !== null
              ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-md'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {currentQuestion === QUIZ_DATA.length - 1 ? 'See Results' : 'Next Question'}
          {currentQuestion !== QUIZ_DATA.length - 1 && <ArrowRight className="w-5 h-5 ml-2" />}
        </button>
      </div>
    </div>
  );
};
