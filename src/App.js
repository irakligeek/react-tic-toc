import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;

  const currentSquares = history[currentMove];

  function resetGame(){
    setHistory(() => {
      return [Array(9).fill(null)];
    });

  }
  
  function handlePlay(nextSquares) {
    // ..
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move){
    setCurrentMove(move);
    console.log("Juming to move: " + move);
  }

  const moves = history.map((gameState, move) => {
    let desc;
    if(move > 0) { //if game started..
        desc = "Got to move #: " + move;
    } else {
      desc = "Go to game start.";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} onReset={resetGame} />
      </div>
      <div className="game-info">
      <p><button onClick={resetGame}>Reset</button></p>
      <p>Travel to Game history</p>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  
  const [reset, setReset] = useState(false);
  
  function handleClick(i) {
    if (calculateWinner(squares)) {
      return; //game is over
    }

    if (squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let gameStatus;

  if (winner) {
    gameStatus = "Game over, the winner is " + winner;
  } else {
    gameStatus = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <p>{gameStatus}</p>
      <div className="board-row">
        <Square value={squares[0]} onClick={() => handleClick(0)}></Square>
        <Square value={squares[1]} onClick={() => handleClick(1)}></Square>
        <Square value={squares[2]} onClick={() => handleClick(2)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onClick={() => handleClick(3)}></Square>
        <Square value={squares[4]} onClick={() => handleClick(4)}></Square>
        <Square value={squares[5]} onClick={() => handleClick(5)}></Square>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onClick={() => handleClick(6)}></Square>
        <Square value={squares[7]} onClick={() => handleClick(7)}></Square>
        <Square value={squares[8]} onClick={() => handleClick(8)}></Square>
      </div>
    </>
  );
}

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

/* ===================== HELPERS ====================== */

function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
