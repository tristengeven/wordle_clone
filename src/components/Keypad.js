import React, { useEffect, useState } from "react";

export default function Keypad({ usedKeys }) {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    // fetch("http://localhost:3001/letters")
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setLetters(json);
    //     console.log(json);
    //   });
    setLetters([
      { key: "a" },
      { key: "b" },
      { key: "c" },
      { key: "d" },
      { key: "e" },
      { key: "f" },
      { key: "g" },
      { key: "h" },
      { key: "i" },
      { key: "j" },
      { key: "k" },
      { key: "l" },
      { key: "m" },
      { key: "n" },
      { key: "o" },
      { key: "p" },
      { key: "q" },
      { key: "r" },
      { key: "s" },
      { key: "t" },
      { key: "Backspace" },
      { key: "u" },
      { key: "v" },
      { key: "w" },
      { key: "x" },
      { key: "y" },
      { key: "z" },
      { key: "Enter" },
    ]);
  }, []);

  const handleButtonClick = (event, keyPressed) => {
    window.dispatchEvent(new KeyboardEvent("keyup", { key: keyPressed }));
  };

  return (
    <div className="keypad">
      {letters &&
        letters.map((l) => {
          const color = usedKeys[l.key];
          return (
            <button onClick={(event) => handleButtonClick(event, l.key)}>
              {l.key !== "Enter" && l.key !== "Backspace" && (
                <div key={l.key} className={color}>
                  {l.key}
                </div>
              )}
              {l.key === "Enter" && (
                <div key={l.key} className={color}>
                  Ent
                </div>
              )}
              {l.key === "Backspace" && (
                <div key={l.key} className={color}>
                  ←
                </div>
              )}
            </button>
          );
        })}
    </div>
  );
}
