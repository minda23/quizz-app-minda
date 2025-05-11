// props.quizzes → [ { title, questions:[...] }, … ]

const Questions = ({ quizzes }) => (
    <div>
        {quizzes.map((quiz, quizIndex) => (
            <section key={quizIndex}>
                <h2>{quiz.title}</h2>

                {quiz.questions.map((q, qIndex) => (
                    <button key={qIndex} className="questions">
                        {q.question}
                    </button>
                ))}
            </section>
        ))}
    </div>
);

export default Questions;
