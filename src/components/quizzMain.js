import React, { useState, useEffect } from 'react';
import { Switch } from "@mui/material";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Question from './question';

// použiť currentPage a zobraziť relevantnu otazku.
// ked je current page 1 tak sa zobrazi prvá otazka. ked je druha sa zobrazi 2.
// jak urobim ked je current page[1] tak sa zobrazi prvá otazka
// bude sa dynamicky update index question [1].
// podľa toho ktora je current page v tom question tak zobrať všetky odpovede z prvej qeustion, budem mapovať cez odpovede nie cez otazku.
// ked sa klikne gombik next tak potom sa zmeni page na page plus 1.
//Dobry den, je to na vas, 
//mozete but vybrat tu spravnu otazku v tom prvom komponente a
 //potom ju posunut do QuestionList, alebo, mozete posunut currentPage do QuestionList a tak ju az tam vybrat :)

const QuizzMain = () => {
    const [quizzData, setQuizzData] = useState([]);
    const [checked, setChecked] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState("");
    const [showScore, setShowScore] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [isQuizStarted, setIsQuizStarted] = useState(false);

    const totalQuestions = 10;

    const selectedItem = quizzData.find(item => item.title === currentQuestion);
    console.log(selectedItem)

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const setNewQuestion = () => {
        setCurrentQuestion(currentQuestion + 1)
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
                            {/* <div className='question-text'>{quizzData.questions[0].question.title}</div> */}
                            {quizzData[0].questions[currentQuestion].choices.map((choice, index)  => (

                                <button
                                    className="question-card"
                                    key={index}
                                     onClick={setNewQuestion}
                                >
                                 {choice}
                                </button>
                                
                            ))}
                              <button
                                className='sub-btn'
                                onClick={setNewQuestion}
                                disabled={showScore}
                            >
                                {getButtonLabel()}
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
