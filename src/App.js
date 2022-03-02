import React from "react";
import { ReactComponent as Blob1 } from "./Assets/Images/blob-lemony-medium.svg";
import { ReactComponent as Blob2 } from "./Assets/Images/blob-baby-medium.svg";
import "./App.css";
import Intro from "./components/Intro";
import Questions from "./components/Questions";
function App() {
  const [data, setData] = React.useState([]);
  const [correctAnswers, setCorrectAnswers] = React.useState([]);
  const [newGame, setNewGame] = React.useState(true);
  const [displayMsg, setDisplayMsg] = React.useState("");
  const [displayAnswer, setDisplayAnswer] = React.useState(false);
  const [gameEnd, setGameEnd] = React.useState(false);

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

  React.useEffect(() => {
    setCorrectAnswers(
      data.map(item => {
        return item.correctAnswer;
      })
    );
  }, [data]);

  function startQuiz() {
    setNewGame(!newGame);
    console.log(newGame);
  }

  const questionElements = data.map((item, index) => {
    return (
      <Questions
        key={item.id}
        ID={item.id}
        question={item.question}
        answers={item.allAnswers}
        holdAnswer={holdAnswer}
        correctAnswer={correctAnswers[index]}
        gameEnd={gameEnd}
      />
    );
  });

  function holdAnswer(questionID, buttonID) {
    // get the question in data, map over its answers and
    // update isHeld state to true on the one selected
    // if isHeld is true on a not selected answer, set it to false (toggle answers)
    const newAnswers = data[questionID].allAnswers.map(answer => {
      return answer.id === buttonID
        ? { ...answer, isHeld: !answer.isHeld }
        : answer.isHeld
        ? { ...answer, isHeld: !answer.isHeld }
        : answer;
    });

    // map over the data and update the question with new answers state
    const newState = data.map(question => {
      return question.id === questionID
        ? { ...question, allAnswers: newAnswers }
        : question;
    });
    setData(newState);
  }

  function checkAnswer() {
    // create array with all selected answers (isHeld = true)
    const selectedAnswers = [];
    data.map(question => {
      return question.allAnswers.forEach(answer => {
        if (answer.isHeld) {
          selectedAnswers.push(answer.answer);
        }
      });
    });

    // get good answers count to display in message
    let count = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      for (let j = 0; j < selectedAnswers.length; j++) {
        if (selectedAnswers[j] === correctAnswers[i]) {
          count = count + 1;
        }
      }
    }

    setDisplayMsg(`You scored ${count}/${correctAnswers.length} good answers`);
    setDisplayAnswer(!displayAnswer);
    setGameEnd(!gameEnd);
  }

  function playAgain() {
    setDisplayMsg("");
    setDisplayAnswer(!displayAnswer);
    setGameEnd(!gameEnd);
    getQuestion();
  }

  const checkAnswerBtn = (
    <button className="check-answers" onClick={checkAnswer}>
      Check Answers
    </button>
  );

  const playAgainBtn = (
    <>
      <p className="display-msg">{displayMsg}</p>
      <button className="check-answers" onClick={playAgain}>
        Play Again
      </button>
    </>
  );
  return (
    <div className="App">
      <Blob1 className="blob1" />
      {newGame ? (
        <Intro handleStart={startQuiz} />
      ) : (
        <div className="quizz-components">
          {questionElements}
          <div className="answer-container">
            {!displayAnswer ? checkAnswerBtn : playAgainBtn}
          </div>
        </div>
      )}
      <Blob2 className="blob2" />
    </div>
  );
}

export default App;
