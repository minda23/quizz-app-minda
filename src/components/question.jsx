import React, { useState } from 'react';
import ResultPage from './resultPage';

const QuestionList = ({ choice, answer }) => {
  const [isActive, setIsActive] = useState(false);
       const [score, setScore] = useState(0);
       const [showScore, setShowScore] = useState(false);

  const selectCorrectAnswer = () => {
    if (answer && answer.length > 0) {
      setIsActive(true);
      setScore(score + 1);
    } else {
      setIsActive(false);
    }
  };

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
};

  return (
    
    <div className="questions-container">
      <div className="question-block">
        <button
          style={{
            backgroundColor: isActive ? 'green' : '#c8c7c5',
             border: isActive ? '2px solid green' : '2px solid transparent',
          }}
          className="question-card"
          onClick={selectCorrectAnswer}
        >
          {choice}
        </button>
        {showScore ? (
          <ResultPage score={score} onRestart={restartQuiz} />
        ) : null}
      </div>
    </div>
  );
};

export default QuestionList;
