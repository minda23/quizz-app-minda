import React, { useState } from 'react';
import ResultPage from './resultPage';

// onClick: prop ktoru dostaneme od quzzMain, a tato prop je v sebe vlastne setDisabled() a setAnswer().
//          Chceme ju spustit ked je kliknuty gombik / tento answer
const answer = ({ choice, answer, onClick }) => {
  const [isActive, setIsActive] = useState(false);
 


      

  let buttonStyle = {
    backgroundColor: choice === answer  ? 'green' : 'red',
     border: choice === answer ? '2px solid green' : '2px solid red',
  };

  const noStyle = {};

  return (
    
    <div className="questions-container" onClick={() => {
      setIsActive(true)
      onClick()
     }}>
      <div className="question-block">
        <button 
          style={isActive ? buttonStyle : noStyle} 
          className="question-card"
        >
          {choice}
        </button>
       
      </div>
    </div>
  );
};

export default answer;
