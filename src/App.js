import React from "react";
import { ReactComponent as Blob1 } from "./Assets/Images/blob-lemony-medium.svg";
import { ReactComponent as Blob2 } from "./Assets/Images/blob-baby-medium.svg";
import "./App.css";
import Intro from "./components/Intro";
import Questions from "./components/Questions";
function App() {
  const [questions, setQuestions] = React.useState([]);

  React.useState(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
      .then(res => res.json())
      .then(data => setQuestions(data.results));
  }, []);
  console.log(questions);
  return (
    <div className="App">
      <Blob1 className="blob1" />
      <div className="quizz-components">
        {/* <Intro /> */}
        <Questions questions={questions} />
      </div>
      <Blob2 className="blob2" />
    </div>
  );
}

export default App;
