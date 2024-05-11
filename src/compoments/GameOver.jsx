export default function GameOver({winner, onStart}) {
    return <div id={"game-over"}>
        <h2>Game Over!</h2>
        {winner && <p>{winner} won!</p>}
        {!winner && <p>it's a draw</p>}
        <p>
            <button onClick={onStart}>Rematch!</button>
        </p>
    </div>
}