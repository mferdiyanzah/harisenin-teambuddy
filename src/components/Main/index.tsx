import React, { useEffect, useState, createContext, useRef } from "react";
import style from "./style.module.css";
import quizServices from "../../services/quiz";

type Props = {
  handleFormValue: (value: string, key: string) => void;
  handleSubmit: (e: any) => void;
  id: string;
};

const Main = ({ handleFormValue, handleSubmit, id }: Props) => {
  const [categories, setCategories] = useState({});

  useEffect(() => {
    quizServices
      .getCategories()
      .then((res) => setCategories(res.data))
      .catch((er) => console.log(er));
  }, []);

  return (
    <div className={style.main} id={id}>
      <h1>Quizzzz</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="">Select Categories</label>
              </td>
              <td>
                <select
                  onChange={(e) =>
                    handleFormValue(e.target.value, "categories")
                  }
                  required
                >
                  {Object.keys(categories).map((cat) => (
                    <option
                      value={cat
                        ?.toLowerCase()
                        .split(" ")
                        .join("_")
                        .replace("&", "and")}
                      key={cat}
                    >
                      {cat}
                    </option>
                  ))}
                </select>
              </td>
            </tr>

            <tr>
              <td>
                <label htmlFor="">Select Difficulty</label>
              </td>
              <td>
                <select
                  onChange={(e) =>
                    handleFormValue(e.target.value, "difficulty")
                  }
                  required
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={style.btn}>
          <button type="submit">Create Quiz</button>
        </div>
      </form>
    </div>
  );
};

export default Main;
