import React, { useState, useEffect } from 'react';
import { Switch } from "@mui/material";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Answer from './answer';
import ResultPage from './resultPage';
import QuizzTheme from './quizzTheme';
const QuizzMain = () => {
    // Vsetky hodnoty ktore definujeme tuto hore, su prve hodnoty ako sa nacita stranka, a potom sa mozu zmenit
    const [quizzData, setQuizzData] = useState([]);
    const [checked, setChecked] = useState(false);
    const [hasQuizzEnded, setHasQuizzEnded] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const  [currentQuizz, setCurrentQuizz] = useState(null);
    const [selectedChoice, setSelectedChoice] = useState(0)
    const [score, setScore] = useState(40); 
      const [show, setShow] = useState(false);
    const [disabled,setDisabled] = useState(true)




  function toggle() {
    setShow((show) => !show);
  }

    const totalQuestions = 10;
    const selectedItem = quizzData.find(item => item.title === currentQuestion);
    console.log(selectedItem)

    const setNewQuestion = () => {
        setDisabled(true)
        setCurrentQuestion(currentQuestion + 1) // 9 -> 10
        console.log("spusta sa ked sa klikne na nasleduju otazku",currentQuestion)
        if (currentQuestion >= totalQuestions - 1) {
            setHasQuizzEnded(true)
            console.log("spusta sa ked quizz konči",currentQuestion)

        }
         
     };

     const restartQuiz = () => {
            setCurrentQuestion(0)
            setScore(0)
            setHasQuizzEnded(false);
            setDisabled(true)
         }

    const selectTheme = (id) => {
            setCurrentQuizz(id)
            setCurrentQuestion(0)
            setScore(0)
            setHasQuizzEnded(false);
            setDisabled(true)
    }
    

     const handleChange = (event) => {
        setChecked(event.target.checked);
     };

    // Tato fukncia je zavolana ked klikneme na hocijaku odpoved
    const selectAnswer = (myChoice) => { // => znamena arrow function (funkcia)
        setSelectedChoice(myChoice); 
        setShow(false)
        if (quizzData[0].questions[currentQuestion].answer === myChoice) {
            setScore(score + 1)
        } else {
            setScore(score - 1)
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
                <div className='quizz-section'>
                    <div>
                        <div>
                            {quizzData.map((theme, id) => (
                                <QuizzTheme     onClick={() => {{selectTheme(id) 
                                }
                                }} key={id} title={theme.title} icon={theme.icon} />
                            ))}
                        </div>

                  </div>
         <div className="quizz">
  {!hasQuizzEnded ? (
    currentQuizz !== null && (
      <div className="quizz-list">
        <h2>{quizzData[currentQuizz].questions[currentQuestion].question}</h2>

        {quizzData[currentQuizz].questions[currentQuestion].choices.map(
          (choice, index) => (
            <Answer
              key={choice}
              choice={choice}
              answer={quizzData[currentQuizz].questions[currentQuestion].answer}
              onClick={() => {
                console.log(
                  "je to správne",
                  quizzData[currentQuizz].questions[currentQuestion].answer
                );
                if (
                  quizzData[currentQuizz].questions[currentQuestion].answer ===
                  choice
                ) {
                  setDisabled(false);
                }
                selectAnswer(choice);
              }}
            />
          )
        )}

        <button
          className="sub-btn"
          onClick={setNewQuestion}
          disabled={disabled}
        >
          Next Question
        </button>
      </div>
    )
  ) : (
    <ResultPage score={score} onRestart={restartQuiz} />
  )}
</div>
               
          </div>

         </div>
        </>
        
    );
};

export default QuizzMain;
