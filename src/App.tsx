import { useEffect, useRef, useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Quizzes from "./components/Quizzes";
import quizServices from "./services/quiz";

function App() {
  const [formData, setData] = useState({
    categories: "arts_and_literature",
    difficulty: "easy",
  });

  const quizRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLInputElement>(null);

  const [questions, setQuestions] = useState([]);

  const handleFormValue = (value: string, key: string) => {
    if (key === "categories") {
      setData({ categories: value, difficulty: formData.difficulty });
    } else {
      setData({ difficulty: value, categories: formData.categories });
    }
  };

  const handleSubmitCreateQuiz = (e: any) => {
    e.preventDefault();
    quizServices
      .getQuestions(formData.categories, formData.difficulty)
      .then((res) => {
        setQuestions(res.data);
        quizRef.current?.scrollIntoView({ behavior: "smooth" });
      })
      .catch((er) => console.log(er));
  };

  const handleScore = () => {
    setQuestions([]);
  };

  return (
    <div className="App">
      <div ref={mainRef}>
        <Main
          id="main"
          handleFormValue={handleFormValue}
          handleSubmit={handleSubmitCreateQuiz}
        />
      </div>
      <div ref={quizRef}>
        <Quizzes id="quizzes" questions={questions} handleScore={handleScore} />
      </div>
    </div>
  );
}

export default App;
