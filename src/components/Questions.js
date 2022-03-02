import { decode } from "html-entities";
import React from "react";

export default function Questions(props) {
  const answersBtn = props.answers.map(btn => {
    const styles = btn.isHeld ? "answers held" : "answers";
    return (
      <button
        className={
          props.gameEnd && btn.answer === props.correctAnswer
            ? "answers correct"
            : props.gameEnd && btn.answer !== props.correctAnswer && btn.isHeld
            ? "answers wrong"
            : props.gameEnd
            ? "answers end"
            : styles
        }
        key={btn.id}
        onClick={() => props.holdAnswer(props.ID, btn.id)}
      >
        {decode(btn.answer)}
      </button>
    );
  });

  return (
    <div className="questions">
      <h1 className="questions--title">{decode(props.question)}</h1>
      <div className="answers--list">{answersBtn}</div>
      <hr className="h-line" />
    </div>
  );
}
