import React, { useState, useEffect } from 'react';
import { Switch } from "@mui/material";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Question from './question';

const QuizzMain = () => {
    const [sections, setSections] = useState([]);
    const [checked, setChecked] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState("");

    const handleChange = (event) => {
        setChecked(event.target.checked);
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

    const selectedItem = sections.find(item => item.title === selectedTheme);

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
                    <div className="subjects-list">
                        {sections.map((subject, index) => (
                            <button
                                className="subject-card"
                                key={index}
                                onClick={() => setSelectedTheme(subject.title)}
                            >
                                <img src={subject.icon} alt={subject.title} />
                                {subject.title}
                            </button>
                        ))}
                    </div>

                    {!!selectedItem && (
                        <Question questions={selectedItem.questions} />
                    )}
                </div>
            </div>

            <div className="progressbar-container">
                <ProgressBar
                    className="responsive-progressbar"
                    variant="info"
                    now={20}
                />
            </div>
        </>
    );
};

export default QuizzMain;
