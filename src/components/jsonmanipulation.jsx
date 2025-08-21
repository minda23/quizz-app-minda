// const data = {
//     "quizzes": [
//         {
//             "title": "HTML",
//             "icon": "./images/icon-html.svg",
//             "questions": [
//                 {
//                     "question": "What does HTML stand for?",
//                     "choices": [
//                         "Hyper Trainer Marking Language",
//                         "Hyper Text Marketing Language",
//                         "Hyper Text Markup Language",
//                         "Hyper Text Markup Leveler"
//                     ],
//                     "answer": "Hyper Text Markup Language"
                    
//                 },
//                  {
//                     "question": "What does HTML stand for?",
//                     "choices": [
//                         "Hyper Trainer Marking Language",
//                         "Hyper Text Marketing Language",
//                         "Hyper Text Markup Language",
//                         "Hyper Text Markup Leveler"
//                     ],
//                     "answer": "Hyper Text Markup Language"
                    
//                 },
//              ]
//         }
//     ]
// }

//const choices = data.quizzes[0].questions[0].choices;

const pole = ["a", "b"];

const getNextQuestion = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const a = 0;

    const nextQuestion = (a, b, c) => {
        setCurrentQuestion(currentQuestion + 1) 
    }

    console.log(pole[currentQuestion]);

    <div>
        <button onClick={nextQuestion}></button>
    </div>
}