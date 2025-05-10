import React, { useState, useEffect } from 'react';

const Question = ({ quizzes }) => {
    return (
        <div>
            <button className="questions">
                {quizzes.questions}
            </button>
        </div>
    );
};

export default Question;