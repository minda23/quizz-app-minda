import React, { useState, useEffect } from 'react';
import { Switch } from "@mui/material";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Question from './question';

const QuizzMain = () => {
    const [sections, setSections] = useState([]);
    const [checked, setChecked] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState("");
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // ✅ track page
    const [isQuizStarted, setIsQuizStarted] = useState(false); // ✅ hide categories

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const pageSize = 4;

    const selectedItem = sections.find(item => item.title === selectedTheme);
    const questions = selectedItem?.questions || [];

    const totalPages = Math.ceil(questions.length / pageSize);
    const paginatedQuestions = questions.slice((currentPage - 1) * pageSize, currentPage * pageSize); // ✅

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
                            {sections.map((subject, index) => (
                                <button
                                    className="subject-card"
                                    key={index}
                                    onClick={() => {
                                        setSelectedTheme(subject.title);
                                        setIsQuizStarted(true); // ✅ hide list
                                    }}
                                >
                                    <img src={subject.icon} alt={subject.title} />
                                    {subject.title}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div>
                            <Question questions={paginatedQuestions} />
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
