import { useEffect, useState } from "react";
import Wordle from "./components/Wordle";
import logo from "./logo.svg";

function App() {
  // state-based game, where state of game is determined by a word to be solved
  const [solution, setSolution] = useState(null);

  //execute once when page is rendered to get random word for game
  useEffect(() => {
    fetch("http://localhost:3001/solutions")
      .then((res) => res.json())
      .then((json) => {
        //get random solution from api list
        const randomWord = json[Math.floor(Math.random() * json.length)];
        setSolution(randomWord.word);
      });
  }, [setSolution]);

  return (
    <div className="App">
      <h1 className=" text-xl">Wordel</h1>
      {/* {solution && <div>Solution: {solution}</div>} */}
      {solution && <Wordle solution={solution} />}
    </div>
  );
}

export default App;
