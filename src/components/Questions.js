import { decode } from "html-entities";
import React from "react";

export default function Questions(props) {
  const answers = props.answers.map(item => {
    return (
      <p className="answers" key={item.id}>
        {item.answer}
      </p>
    );
  });

  return (
    <div className="questions">
      <h1 className="questions--title">{decode(props.question)}</h1>
      <div className="answers--list">{answers}</div>
    </div>
  );
}
