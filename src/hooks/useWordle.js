import { useState } from "react";

// solution grabbed in useEffect in App component
const useWordle = (solution) => {
  // different states we want to maintain during the game
  const [turn, setTurn] = useState(0); // turn counter, up to 6
  const [currentGuess, setCurrentGuess] = useState(""); // update current guess to show it in squares, updated by handleKeyup
  const [guesses, setGuesses] = useState([...Array(6)]); // formatted guesses as an array, updated by formatGuess
  const [history, setHistory] = useState([]); // past guesses as strings, separate to check for duplicate guesses
  const [isCorrect, setIsCorrect] = useState(false); // only changed if user wins game, allows us to show congrats
  const [usedKeys, setUsedKeys] = useState({}); // track keys used and what color they should be
  const [isNotWord, setIsNotWord] = useState(false); // track if guess entered is not a valid word

  // format a guess into array of letter objects with keys and colors
  // [{key: 'a', color: 'yellow'}]
  const formatGuess = () => {
    console.log(`Formatting guess: ${currentGuess}`);
    var solutionArray = [...solution]; // turns solution into array of letters
    var formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "gray" };
    }); // turns currentGuess into array of letters,
    // then maps each letter into an object with the letter as key,
    // and a default color of gray which will be updated if needed

    // find any green letters (exact position)
    formattedGuess.forEach((entry, index) => {
      if (solutionArray[index] === entry.key) {
        formattedGuess[index].color = "green";
        solutionArray[index] = null; // prevents double matching
      }
    });

    // find any yellow letters (right letter, wrong place)
    formattedGuess.forEach((entry, index) => {
      if (solutionArray.includes(entry.key) && entry.color !== "green") {
        formattedGuess[index].color = "yellow";
        solutionArray[solutionArray.indexOf(entry.key)] = null;
      }
    });

    return formattedGuess;
  };

  // update isCorrect state if guess is correct
  // add a submitted guess to the guesses state
  // increment turn state
  const addNewGuess = (formattedGuess) => {
    // set isCorrect if guess is right
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prevGuesses) => {
      // grabs most recent state of guesses
      // spreads them over array, replaces index of turn with formatted guess
      // and returns newGuesses to update guesses state
      var newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      // update history of guesses, which are just strings
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      // increment turn
      return prevTurn + 1;
    });
    setUsedKeys((prevUsedKeys) => {
      formattedGuess.forEach((l) => {
        const currentColor = prevUsedKeys[l.key]; // l.key is a letter, which corresponds to the key of the prevUsedKeys object

        if (l.color === "green") {
          prevUsedKeys[l.key] = "green";
          return;
        }
        if (l.color === "yellow" && currentColor !== "green") {
          prevUsedKeys[l.key] = "yellow";
          return;
        }
        if (
          l.color === "gray" &&
          currentColor !== "green" &&
          currentColor !== "yellow"
        ) {
          prevUsedKeys[l.key] = "gray";
          return;
        }
      });

      return prevUsedKeys;
    });

    // reset current guess
    setCurrentGuess("");
  };

  // handle keyup event to track current guess
  // submit guess on press enter
  const handleKeyup = ({ key }) => {
    // check if key is Enter, to submit guess
    if (key === "Enter") {
      // only add guess if turn < 5
      if (turn > 5) {
        console.log("no more guesses");
        return;
      }
      // don't submit duplicate words
      if (history.includes(currentGuess)) {
        console.log("duplicate guess");
        return;
      }
      // ensure guess is 5 chars long
      if (currentGuess.length !== 5) {
        console.log("guess must be 5 letters!");
        return;
      }
      // ensure guess is a real word
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentGuess}`)
        .then((res) => res.json())
        .then((json) => {
          console.log(json.title);
          if (json.title === "No Definitions Found") {
            setIsNotWord(true);
            setTimeout(() => setIsNotWord(false), 1000);
            return;
          } else {
            // if here, guess is valid
            var formatted = formatGuess(); // we don't need to pass currentGuess as argument because we can access it from the state
            addNewGuess(formatted);
          }
        });
    }

    // check if key is Backspace, to remove letter
    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        // setCurrentGuess gets most recent value of currentGuess which we store as prev to udpate
        return prev.slice(0, -1);
      });
      return;
    }

    // use regex to check if key pressed is a character and not a special key
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          // setCurrentGuess gets most recent value of currentGuess which we store as prev to udpate
          return prev + key;
        });
      }
    }
  };

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    isNotWord,
    usedKeys,
    handleKeyup,
  }; // handleKeyup will be called from outside this hook so we need to return it
};

export default useWordle;
