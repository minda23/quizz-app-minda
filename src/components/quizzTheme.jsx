import React from 'react';


const QuizzTheme = ({title,icon,onClick}) => {
    return (
        <div className='themes '>
            <div onClick={onClick} className='button dark'>
            <h2 >{title}</h2>
            <img className='icon' src={icon} alt={title} />
            </div>
        </div>
    );
};

export default QuizzTheme;