import React from "react";

export default function Row({ guess, currentGuess }) {
  if (guess) {
    // here we would have a guess, but no currentGuess
    return (
      <div className="row past ">
        {guess.map((letter, index) => (
          <div key={index} className={letter.color}>
            {letter.key}
          </div>
        ))}
      </div>
    );
  }

  if (currentGuess) {
    // here we would have a currentGuess, but no guess
    var letters = currentGuess.split("");

    return (
      <div className="row current">
        {letters.map((letter, index) => (
          <div key={index} className="filled">
            {letter}
          </div>
        ))}
        {/* number of blank squares should be equal to 5 - current guesses letters */}
        {[...Array(5 - letters.length)].map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    );
  }

  return (
    <div className="row ">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
