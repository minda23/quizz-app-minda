import React, { useState, useEffect } from 'react';
import { Switch } from "@mui/material";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Answer from './answer';
import ResultPage from './resultPage';
const QuizzMain = () => {
    const [quizzData, setQuizzData] = useState([]);
    const [checked, setChecked] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(0)
    const [score, setScore] = useState(40); 
    const [disabled,setDisabled] = useState(true)
    
    const totalQuestions = 10;
    const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowScore(false);
  };

    const selectedItem = quizzData.find(item => item.title === currentQuestion);
    console.log(selectedItem)

    const setNewQuestion = () => {
        setCurrentQuestion(currentQuestion + 1)
       
         
     };

     const handleChange = (event) => {
        setChecked(event.target.checked);
     };

    // Tato fukncia je zavolana ked klikneme na hocijaku odpoved
    const selectAnswer = (myChoice) => { // => znamena arrow function (funkcia)
        setSelectedChoice(myChoice); 
        if (quizzData[0].questions[currentQuestion].answer === myChoice) {
            
        
        } else {
         
        }
    };
        const getButtonLabel = () => {
        if (showScore) return "Score Submitted";
        if (currentQuestion < totalQuestions) return "Next Question";
        return "Submit";
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

    console.log("Hello world!")
    console.log(quizzData);

    if (quizzData === undefined || quizzData.length === 0 || quizzData[0] === undefined) {
        return (<div>Loading...</div>);
    }

    console.log(quizzData[0]);
    
    // najprv mame logicku časť ktora je spravna odpoved
    // a vizualna aby nam to vykreslilo farebne.
    //const chooseRightAnswer = quizzData[0].questions[currentQuestion].choices.filter((answer) => answer.title === selectedChoice)

    console.log("Button je", disabled);

    return (
        <>
            <div className="quizz-container">
                <div className="left-section">
                    <h1 className="heading-quizz">
                        Welcome to the <br />
                        Frontend Quiz!
                    </h1>
                    <p className="text-heading">Pick a subject to get started.</p>
                </div>
                <div className="right-section">
                    <div className="toggle-section">
                        <span role="img" aria-label="sun">🌞</span>
                        <Switch
                            checked={checked}
                            onChange={handleChange}
                            name="toggle"
                            color="secondary"
                        />
                        <span role="img" aria-label="moon">🌙</span>
                    </div>
                </div>

          <div className="quizz">
              {!showScore ? (
                  <div className="quizz-list">
                      <h2>{quizzData[0].questions[currentQuestion].question}</h2>
                      {quizzData[0].questions[currentQuestion].choices.map((choice, index) => 
                        // choice = jedna z odpovedi v `choices` poli
                        (
                          <Answer
                              key={index}
                              choice={choice}
                              answer={quizzData[0].questions[currentQuestion].answer}
                              // Tato `onClick` funkcia je zavolana ked klikneme na hocijaku odpoved
                              onClick={() => {
                                console.log("je to správne", quizzData[0].questions[currentQuestion].answer)
                                if ( quizzData[0].questions[currentQuestion].answer === choice) {
                                   setDisabled(false);
                                }
                                
                                selectAnswer(choice);
                              }} 
                          />
                      ))}
                  </div>
                  
                  
              ) : (
                  <ResultPage score={score} onRestart={restartQuiz} />
              )}
                  (
                      <button
                      className="sub-btn"
                      onClick={setNewQuestion}
                      disabled={disabled}
                      
                    
                      >
                       Next Question
                      </button>
                    )
          </div>
               
          </div>

            <div className="progressbar-container">
                <ProgressBar
                    className="responsive-progressbar"
                    variant="info"
                    now={(currentQuestion / totalQuestions) * 100}
                />
            </div>
        </>
    );
};

export default QuizzMain;
