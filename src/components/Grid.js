import React from "react";
import Row from "./Row";

export default function Grid({ currentGuess, guesses, turn }) {
  return (
    <div className="grid_container">
      {guesses.map((g, index) => {
        if (turn === index) {
          return <Row key={index} currentGuess={currentGuess} />;
        }
        return <Row key={index} guess={g} />;
      })}
    </div>
  );
}
