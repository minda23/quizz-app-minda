import React, { useState, useEffect } from 'react';
import { Switch } from "@mui/material";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Answer from './answer';
const QuizzMain = () => {
    const [quizzData, setQuizzData] = useState([]);
    const [checked, setChecked] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState("");
    const [showScore, setShowScore] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(0)
    const totalQuestions = 10;

    const selectedItem = quizzData.find(item => item.title === currentQuestion);
    console.log(selectedItem)

    const setNewQuestion = () => {
        setCurrentQuestion(currentQuestion + 1)
     };

     const handleChange = (event) => {
        setChecked(event.target.checked);
     };

    const selectAnswer = (myChoice) => {
        // ulozime si vybratu moznost od pouzivatela do 'selectedChoice'
        // ALE, spravi sa to az nakoniec tejto funkcii
        setSelectedChoice(myChoice);
        if (quizzData[0].questions[currentQuestion].answer === myChoice) {
            console.log('spravne!');
        } else {
            console.log('nespravne :(');
        }
    }

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
                     (
                        <div className="quizz-list">
                            {quizzData[0].questions[currentQuestion].choices.map((choice, index)  => (
                                 <div key={choice}>
                                    <Answer 
                                        onClick={() => selectAnswer(choice)} 
                                        choice={choice} 
                                        setNewQuestion={setNewQuestion} 
                                        answer={quizzData[0].questions[currentQuestion].answer} 
                                    />
                                </div>
                            ))}
                                
                             <button
                        className='sub-btn'
                        onClick={setNewQuestion}
                        
                   >nextQuestion
                 </button>
                        </div>
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
