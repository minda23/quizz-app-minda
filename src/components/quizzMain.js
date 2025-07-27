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
    const [selectedTheme, setSelectedTheme] = useState("");
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [selectedQuestion, setSelectedQuestion] = useState ("")
     const [isQuizStarted, setIsQuizStarted] = useState(false);
    const [show, setShow] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const setNewQuestion = () => {
        if (currentPage[1] === selectedQuestion) {
            return;
        }
     };

    const AnswerPerPage = 4;

    const selectedItem = quizzData.find(item => item.title === selectedTheme);
    const questions = selectedItem?.questions || [];

    const totalPages = Math.ceil(questions.length / pageSize);
    console.log(totalPages)

    console.log(totalPages)
    
    const ChooseRightQuestion = questions.slice((selectedQuestion - 1) * pageSize, selectedQuestion * pageSize); 
    
    const handleSubmitClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        } else {
            setShowScore(true);
        }
    };

    const getButtonLabel = () => {
        if (showScore) return "Score Submitted";
        if (currentPage < totalPages) return "Next Question";
        return "Submit";
    };

    useEffect(() => {
        fetch("./data.json")
            .then((response) => response.json())
            .then((data) => setSections(data.quizzes))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        document.body.classList.toggle('light-mode', checked);
        document.body.classList.toggle('dark-mode', !checked);
    }, [checked]);

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
                    {!isQuizStarted ? (
                        <div className="subjects-list">
                            {quizzData.map((question, index) => (
                                <button
                                    className="subject-card"
                                    key={index}
                                    onClick={() => {
                                        setSelectedTheme(question.title);
                                        setIsQuizStarted(true); 
                                    }}
                                >
                                    <img src={subject.icon} alt={question.title} />
                                    {question.title}
                                    {question.question.options.map((option, key) => (
                                        <Question key={key}>{option}</Question>
                                    ))}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <button
                                className='sub-btn'
                                onClick={handleSubmitClick}
                                disabled={showScore}
                            >
                                {getButtonLabel()}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="progressbar-container">
                <ProgressBar
                    className="responsive-progressbar"
                    variant="info"
                    now={(currentPage / totalPages) * 100}
                />
            </div>
        </>
    );
};

export default QuizzMain;
