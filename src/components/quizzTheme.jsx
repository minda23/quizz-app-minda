import React from 'react';


const QuizzTheme = ({title,icon,onClick}) => {
    return (
        <div className='themes'>
            <div className='button'>
            <h2 onClick={() => {
            onClick();
         }}>{title}</h2>
            <img src={icon} alt={title} />
            </div>
        </div>
    );
};

export default QuizzTheme;