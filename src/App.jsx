import Player from "./compoments/Player.jsx";
import GameBoard from "./compoments/GameBoard.jsx";
import {useState} from "react";
import Log from "./compoments/Log.jsx"

function App() {
    const [gameTurns, setGameTurns] = useState([]);
    // set initial activePlayer state to X
    const [activePlayer, setActivePlayer] = useState("X");

    function handleSelectSquare(rowIndex, colIndex) {
        setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X");
        setGameTurns(prevTurns => {
            let currentPlayer = "X";

            //prevTurns is just gameTurns in the previous state, so it's just an array, and make sure the length > 0
            if (prevTurns.length > 0 && prevTurns[0].player === "X") {
                currentPlayer = "0";
            }

            const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: activePlayer},
                ...prevTurns];

            return updatedTurns;
        });
    }


    return (
        <main>
            <div id="game-container">
                <ol id="players" className={"highlight-player"}>
                    <Player initialName="Player 1" symbol={"X"} isActive={activePlayer === "X"}></Player>
                    <Player initialName="player 2" symbol={"O"} isActive={activePlayer === "O"}></Player>
                </ol>
                {/*whenever the square is selected, */}
                <GameBoard onSelectSquare={handleSelectSquare} turns = {gameTurns}></GameBoard>
            </div>
            <Log turns={gameTurns}></Log>
        </main>)
}

export default App
