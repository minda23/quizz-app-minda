import React, { useState, useEffect, createContext } from 'react';
import { Switch } from "@mui/material";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Answer from './answer';
import ResultPage from './resultPage'; 
import HomePage from './homePage';


const QuizzMain = () => {
  const [quizzData, setQuizzData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [hasQuizzEnded, setHasQuizzEnded] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentQuizz, setCurrentQuizz] = useState(null);
  const [score, setScore] = useState(0); 
  const [disabled, setDisabled] = useState(true);
  const [numberOfTimesClicked, setNumberOfTimesClicked] = useState(0);

  const totalQuestions = 10;

  let buttonStyle = {
    backgroundColor: disabled ? '#9378a3ff' : '#A729F5',
    transition: 'background-color 0.5s',
  };

  const setNewQuestion = () => {
    setDisabled(true);
    setNumberOfTimesClicked(0);
    setCurrentQuestion((prev) => prev + 1);

    if (currentQuestion >= totalQuestions - 1) {
      setHasQuizzEnded(true);
    }
  };

  

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setHasQuizzEnded(false);
    setDisabled(true);
    setCurrentQuizz(null);
  };

  const selectTheme = (id) => {
    setCurrentQuizz(id);
    setCurrentQuestion(0);
    setScore(0);
    setHasQuizzEnded(false);
    setDisabled(true);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const selectAnswer = (myChoice) => {
    setNumberOfTimesClicked((prev) => prev + 1);

    if (quizzData[currentQuizz].questions[currentQuestion].answer === myChoice) {
         setDisabled(false);
      if (numberOfTimesClicked === 0) {
        setScore((prev) => prev + 1);
      }
    }
     
 
  };

  useEffect(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => setQuizzData(data.quizzes))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    document.body.classList.toggle('light-mode', checked);
    document.body.classList.toggle('dark-mode', !checked);
  }, [checked]);

  if (!quizzData || quizzData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    currentQuizz == null ?
        <HomePage quizzData={quizzData} selectTheme={selectTheme}  />
       : (
        <>
          {!hasQuizzEnded ? (
            <div className="questions-section">
              <div className="count-question">
                <p className='title-question-count'>
                  Question {currentQuestion + 1} of {totalQuestions}
                </p>
                <h2 className='heading-question'>
                  {quizzData[currentQuizz].questions[currentQuestion].question}
                </h2>
                <ProgressBar 
                  now={((currentQuestion + 1) / totalQuestions) * 100} 
                  label={`${currentQuestion + 1}/${totalQuestions}`} 
                />
              </div>

              <div className="quizz-list">
                {quizzData[currentQuizz].questions[currentQuestion].choices.map(
                  (choice) => (
                    <Answer
                      key={choice}
                      choice={choice}
                      answer={quizzData[currentQuizz].questions[currentQuestion].answer}
                      onClick={() => selectAnswer(choice)}
                    />
                  )
                )}

                <button
                  className="sub-btn"
                  onClick={setNewQuestion}
                  disabled={disabled}
                  style={buttonStyle}
                >
                  Next Question
                </button>
              </div>
            </div>
          ) : (
            <ResultPage score={score} onRestart={restartQuiz}  quizzData={quizzData} selectTheme={selectTheme}currentQuizz={currentQuizz}  />
          )}
        </>
      )
    )
};

export default QuizzMain;
