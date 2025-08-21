import React, { useState } from 'react';
import ResultPage from './resultPage';

const answer = ({ choice, answer, onClick }) => {
  const [isActive, setIsActive] = useState(false);
       const [score, setScore] = useState(0);
       const [showScore, setShowScore] = useState(false);

  const selectCorrectAnswer = () => {
    if (onClick()) {
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

  // ZISTIT: Chceme ukazat ked sa zhodzuje choice zos my answer
  // potrbujeme: choice a answer
  // ako ich pouzit: choice === answer
  // onClick === answer -> vzdy FALSE lebo ked sa nezhodzuje data typ, tak vzdy to nebude to iste

  let buttonStyle = {
    backgroundColor: choice === answer  ? 'green' : 'red',
     border: choice === answer ? '2px solid green' : '2px solid red',
  };

  const noStyle = {};

  return (
    
    <div className="questions-container" onClick={() => {setIsActive(true)}}>
      <div className="question-block">()
        <button 
          style={isActive ? buttonStyle : noStyle} 
          className="question-card"
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

export default answer;
