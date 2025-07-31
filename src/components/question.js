import React, { useState, useEffect } from 'react';

const QuestionList = ({ questions,setSelectedQuestion,onSelect,onDeselect }) => {
    if (!questions || questions.length === 0) {
        return <p>No questions available.</p>;
    }
        return (
        <div className="questions-container">
            {questions.map((q, index) => (
                <button onClick={setSelectedQuestion} key={index} className="questions">
                    {q.question}
                </button>

            ))}
        </div>
    );
};

export default QuestionList;