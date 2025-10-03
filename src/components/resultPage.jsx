import React from 'react';
import QuizzTheme from './quizzTheme';


const ResultPage = ({ score, onRestart, quizzData,selectTheme, currentQuizz }) => {
  
 
  const themeTitle = currentQuizz !== null 
    ? quizzData[currentQuizz].title 
    : "";

  return (
    <>

    <div className='result_section'>
    
  <div className='wrapper-result'>
  <div className="score_wrapper">
          <div className='result_heading'>
    <h1>Quizz completed<br />you scored...<br /></h1>
    </div>
  <div className="score-box">
    <h2 className="theme-title">{themeTitle}</h2>
    <p className="score">{score}</p>
    <h2 className="your-score">
      out of {quizzData[currentQuizz].questions.length}
    </h2>
  </div>  


  <button className="restart" onClick={onRestart}>
    Restart Quiz
  </button>


</div>
</div>
  <div className="pick-new-theme">
    <h3 className='pick-theme'>Pick another theme:</h3>
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
</>
  );
};

export default ResultPage;
