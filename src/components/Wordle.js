// entire ui of game will exist here or nested
import React, { useEffect, useState } from "react";
import useWordle from "../hooks/useWordle";
import Grid from "./Grid";
import Keypad from "./Keypad";
import Modal from "./Modal";
import NotWordModal from "./NotWordModal";

// solution is one retrieved by App component
export default function Wordle({ solution }) {
  const {
    currentGuess,
    handleKeyup,
    guesses,
    turn,
    isCorrect,
    isNotWord,
    usedKeys,
  } = useWordle(solution); // we passed the solution from App component to Wordle component, and then we give the useWordle Hook the solution from this component
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    // end game on isCorrect
    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup); // detach event listener so they can't add anymore letters
    }

    // end if turns is over 5
    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000);
      window.removeEventListener("keyup", handleKeyup);
    }

    // prevents us from having a ton of eventListeners out during key presses
    return () => window.removeEventListener("keyup", handleKeyup);
  }, [handleKeyup, isCorrect, turn]);

  return (
    <div className="game_container">
      {/* <div className="  text-lg">(Wordle Component) Solution: {solution}</div> */}
      {/* <div className=" bg-slate-300">Current guess: {currentGuess}</div> */}
      {/* three variables made available to Grid component */}
      {isNotWord && <NotWordModal />}
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </div>
  );
}
