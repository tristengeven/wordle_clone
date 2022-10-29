import React from "react";

export default function Modal({ isCorrect, turn, solution }) {
  return (
    <div className="modal">
      {isCorrect && (
        <div>
          <h1>You won!</h1>
          <p>
            The solution was <span className="solution">{solution}</span>. You
            found it in {turn === 1 && <span>1 guess.</span>}
            {turn > 1 && <span>{turn} guesses.</span>}
          </p>
        </div>
      )}

      {!isCorrect && (
        <div>
          <h1>Aw, maybe next time.</h1>
          <p>
            The solution was <span className="solution">{solution}</span>.
          </p>
        </div>
      )}
    </div>
  );
}
