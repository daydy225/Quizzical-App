import React from "react";
import { ReactComponent as Blob1 } from "./Assets/Images/blob-lemony-medium.svg";
import { ReactComponent as Blob2 } from "./Assets/Images/blob-baby-medium.svg";
import "./App.css";
import Intro from "./components/Intro";
import Questions from "./components/Questions";
function App() {
  return (
    <div className="App">
      <Blob1 className="blob1" />
      <div className="quizz-components"></div>
      <Intro />
      <Blob2 className="blob2" />
    </div>
  );
}

export default App;
