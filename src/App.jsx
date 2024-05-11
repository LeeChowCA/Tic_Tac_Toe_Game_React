import Player from "./compoments/Player.jsx";
import GameBoard from "./compoments/GameBoard.jsx";
import {useState} from "react";
import Log from "./compoments/Log.jsx"
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import GameOver from "./compoments/GameOver.jsx";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];


function deriveActivePlayer (gameTurns) {

    let currentPlayer = "X";

    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
    }

    return currentPlayer;
}

function App() {

    const [players, setPlayers] = useState({X:"Player 1", O:"Player 2"});
    const [gameTurns, setGameTurns] = useState([]);
    // set initial activePlayer state to X
    // const [activePlayer, setActivePlayer] = useState("X"); this can be achieved by the first state

    const activePlayer = deriveActivePlayer(gameTurns);

    //double spread operator to hard copy everything
    let gameBoard = [...initialGameBoard.map(array => [...array])];

    for (const turn of gameTurns) {
        const {square, player} = turn;
        const {row, col} = square;

        gameBoard[row][col] = player;
    }

    let winner;

    for (const combination of WINNING_COMBINATIONS) {
        //iterate all combinations in WINNING_COMBINATION array,
        const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol = gameBoard[combination[2].row] [combination[2].column];

        if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
            winner = players[firstSquareSymbol];
        }
    }

    const hasDraw = gameTurns.length === 9 && !winner;

    function handleSelectSquare(rowIndex, colIndex) {
        // setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X");
        setGameTurns(prevTurns => {
            const currentPlayer = deriveActivePlayer(prevTurns);

            const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: activePlayer},
                ...prevTurns];

            return updatedTurns;
        });
    }

    function handleRestart () {
        setGameTurns([]);
    }

    function handlePlayerNameChange (symbol, newName){
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers, [symbol]:newName
            };
        });
    }


    return (
        <main>
            <div id="game-container">
                <ol id="players" className={"highlight-player"}>
                    <Player initialName="Player 1" symbol={"X"} isActive={activePlayer === "X"} onChaneName = {handlePlayerNameChange}></Player>
                    <Player initialName="player 2" symbol={"O"} isActive={activePlayer === "O"} onChaneName = {handlePlayerNameChange}></Player>
                </ol>
                {(winner || hasDraw) && <GameOver winner={winner} onStart={handleRestart}></GameOver>}
                {/*whenever the square is selected, */}
                <GameBoard onSelectSquare={handleSelectSquare} board = {gameBoard}></GameBoard>
            </div>
            <Log turns={gameTurns}></Log>
        </main>)
}

export default App
