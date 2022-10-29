// entire ui of game will exist here or nested
import React, { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";

// solution is one retrieved by App component
export default function Wordle({ solution }) {
  const { currentGuess, handleKeyup, guesses, turn, isCorrect, usedKeys } =
    useWordle(solution); // we passed the solution from App component to Wordle component, and then we give the useWordle Hook the solution from this component

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    // prevents us from having a ton of eventListeners out during key presses
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <div className=" border-black">
      {/* <div className="  text-lg">(Wordle Component) Solution: {solution}</div> */}
      {/* <div className=" bg-slate-300">Current guess: {currentGuess}</div> */}
      {/* three variables made available to Grid component */}
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
    </div>
  );
}
