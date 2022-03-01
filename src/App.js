import React from "react";
import { ReactComponent as Blob1 } from "./Assets/Images/blob-lemony-medium.svg";
import { ReactComponent as Blob2 } from "./Assets/Images/blob-baby-medium.svg";
import "./App.css";
import Intro from "./components/Intro";
import Questions from "./components/Questions";
function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getQuestion();
  }, []);

  function getQuestion() {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=18&difficulty=medium&type=multiple"
    )
      .then(response => response.json())
      .then(data =>
        setData(
          data.results.map((item, index) => {
            // get all answers and sort them random
            const answers = [
              ...item.incorrect_answers,
              item.correct_answer,
            ].sort(() => Math.random() - 0.5);
            // create an object for each answer and assin values
            const createAnswers = answers.map((answer, index) => {
              return {
                id: index,
                answer: answer,
                isHeld: false,
              };
            });
            return {
              id: index,
              question: item.question,
              correctAnswer: item.correct_answer,
              allAnswers: createAnswers,
            };
          })
        )
      );
  }

  const questionElements = data.map((item, index) => {
    return (
      <Questions
        key={item.id}
        ID={item.id}
        question={item.question}
        answers={item.allAnswers}
      />
    );
  });

  console.table(data);
  return (
    <div className="App">
      <Blob1 className="blob1" />
      <div className="quizz-components">
        {/* <Intro /> */}
        {questionElements}
      </div>
      <Blob2 className="blob2" />
    </div>
  );
}

export default App;
