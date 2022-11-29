import React, { useEffect, useState } from "react";
import style from "./style.module.css";

type Props = {
  id: string;
  questions: any[];
  handleScore: () => void;
};

const mockList = [
  {
    name: "Curry",
    score: 80,
  },
  {
    name: "LeBron",
    score: 60,
  },
  {
    name: "Durant",
    score: 100,
  },
];

const Quizzes = ({ id, questions, handleScore }: Props) => {
  const [selectedAnswer, setSelectedAnswer] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
  ]);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const [showScore, setShowScore] = useState(false);
  // const [score, setScore] = useState(0);
  const [listScore, setListScore] = useState(mockList);

  const getTime = () => {
    if (deadline !== 0) {
      const time = deadline - Date.now();

      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(), 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  useEffect(() => {
    setDeadline(Date.now() + 21000);
  }, [questions]);

  const handleChecked = (number: number, userAnswer: string) => {
    let newAnswers = [...selectedAnswer];
    newAnswers[number] = userAnswer;
    setSelectedAnswer(newAnswers);
  };

  const countScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (q.correctAnswer === selectedAnswer[idx]) {
        score += 20;
      }
    });
    let newList = listScore;
    newList.push({ name: "Yours", score: score });
    newList.sort((a, b) => b.score - a.score);
    setListScore(newList);
    setShowScore(true);
  };

  return (
    <div id={id} className={style.quizzes}>
      {!showScore && (
        <div>
          {deadline - Date.now() > 0 && questions.length > 0 && (
            <div>
              <h4>
                Timer --
                {minutes < 10 ? <>0{minutes}</> : minutes}:
                {seconds < 10 ? <>0{seconds}</> : seconds}
              </h4>
            </div>
          )}
          {deadline - Date.now() > 0 &&
            questions.length > 0 &&
            questions.map((q, idx) => (
              <div key={q.id}>
                <h3>
                  {idx + 1}. {q.question}
                </h3>
                <form>
                  {q.incorrectAnswers.map((ans: string) => (
                    <div key={ans} onChange={() => handleChecked(idx, ans)}>
                      <input type="radio" id={ans} value={ans} name="answer" />
                      <label htmlFor={ans}>{ans}</label>
                    </div>
                  ))}
                  <div onChange={() => handleChecked(idx, q.correctAnswer)}>
                    <input
                      type="radio"
                      id={q.correctAnswer}
                      value={q.correctAnswer}
                      name="answer"
                    />
                    <label htmlFor={q.correctAnswer}>{q.correctAnswer}</label>
                  </div>
                </form>
              </div>
            ))}

          {deadline - Date.now() > 0 && questions.length > 0 && (
            <button onClick={countScore}>Submit</button>
          )}

          {deadline - Date.now() < 0 && questions.length > 0 && (
            <div>
              <h1>Timeout</h1>
              <h5>Please try create a quiz again!!!</h5>
            </div>
          )}
        </div>
      )}

      {showScore && (
        <div>
          <h2>
            Congratulations, your score is{" "}
            {listScore.find((o) => o.name === "Yours")?.score}
          </h2>

          <div>
            <h4>Ranking from this quiz</h4>
            <ol>
              {listScore.map((n) => (
                <li>
                  {n.name === "Yours" ? <b>{n.name}</b> : n.name} - {n.score}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
