import React, { useState, useEffect } from 'react';
import { Switch, FormControlLabel } from "@mui/material";
import './quizzMain.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';

const QuizzMain = () => {
    const [sections, setSections] = useState([]);
    const [checked, setChecked] = useState(false); // Toggle state

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


    const images = [
        './images/icon-moon-dark.svg',
        './images/icon-moon-light.svg',
        './images/icon-sun-dark.svg',
        './images/icon-sun-light.svg'
    ];

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
                            <button className="subject-card" key={index}>
                                <img src={subject.icon} alt={subject.title} />
                                {subject.title}
                            </button>
                        ))}
                    </div>
                </div>


            </div>
            <div>
                <ProgressBar className='progressbar' variant="info" now={20} style={{ width: '35%', marginLeft: '10rem', marginBottom: '3rem' }} />
            </div>

        </>


    )
}
export default QuizzMain;
