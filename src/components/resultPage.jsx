import React, { useState } from 'react';
const ResultPage = ({score,onRestart}) => {

    
    
    return (
        <>
        <div className='score-box'>
           <p className='score'>{score}</p>
            <h2 className='your-score'>out of ten</h2>
            
        </div>
        <div>
         <button className='restart' onClick={onRestart}>Restart Quiz</button>
         </div>
         </>
    );
};

export default ResultPage;