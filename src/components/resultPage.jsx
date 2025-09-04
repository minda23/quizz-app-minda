import React, { useState } from 'react';

const ResultPage = ({score,onRestart}) => {

    
    
    return (
        <div>
          <h2 className='your-score'>Your Score: {score}</h2>
            <button onClick={onRestart}>Restart Quiz</button>
        </div>
    );
};

export default ResultPage;