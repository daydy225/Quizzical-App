import React from "react";

export default function Intro(props) {
  return (
    <div className="intro">
      <h1 className="intro--title">Quizzical</h1>
      <p className="intro--subtitle">
        Welcome to this quizzical game, you will be ask 5 questions to test your
        knowledge about <span>Computer Science</span>.
      </p>
      <button className="intro--btn" onClick={props.handleStart}>
        Start quiz
      </button>
    </div>
  );
}
