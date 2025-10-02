import React, { useState, useEffect, createContext } from 'react';
import { Switch } from "@mui/material";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Answer from './answer';
import ResultPage from './resultPage';
import QuizzTheme from './quizzTheme';  




const homePage = ({quizzData,selectTheme}) => {

      const [checked, setChecked] = useState(false);
     
      const handleChange = (event) => {
       setChecked(event.target.checked);
  };

return (

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

          <div>
            {quizzData.map((theme, id) => (
              <QuizzTheme
                key={id}
                title={theme.title}
                icon={theme.icon}
                themeId={id}
                 onClick={() => selectTheme(id)}   
              />
            ))}
          </div>
        </div>
      )
}

export default homePage