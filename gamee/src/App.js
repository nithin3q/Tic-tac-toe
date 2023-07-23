import './App.css';
import { Scoreboard } from './components/Scoreboard';
import { useState, useEffect } from 'react';
import './App.css';

import Board from './components/Board';

function App() {
  const win_conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xscore: 0, oscore: 0 });
  const [gameOver, setGameOver] = useState(false);



  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const gameWinner = checkWinner(board);
    if (gameWinner) {
      setGameOver(true);
      setWinner(gameWinner);
      updateScores(gameWinner);
    } else if (!board.includes(null)) {
      setGameOver(true);
    }
  }, [board]);


  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      setGameOver(true);
      updateScores(winner);
    } else if (!board.includes(null)) {
      setGameOver(true);
    }
  }, [board]);

  const handleBoxClick = (boxIdx) => {
    if (!board[boxIdx] && !gameOver) {
      const updatedBoard = board.map((value, idx) =>
        idx === boxIdx ? (xPlaying ? 'x' : 'o') : value
      );

      setBoard(updatedBoard);
      setXPlaying(!xPlaying);
    }
  };

  const checkWinner = (board) => {
    for (let i = 0; i < win_conditions.length; i++) {
      const [x, y, z] = win_conditions[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        return board[x];
      }
    }
    return null;
  };

  const updateScores = (winner) => {
    if (winner === 'o') {
      setScores({ ...scores, oscore: scores.oscore + 1 });
    } else {
      setScores({ ...scores, xscore: scores.xscore + 1 });
    }
  };

  const resetBoard = () => {
    setBoard(Array(9).fill(null));
    setXPlaying(true);
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div>
      <h1 className='nithin' style={{textAlign:'center',color:'rgb(156, 7, 77)'}}>Tic-Tac-Toe</h1>
      <Scoreboard scores={scores} xPlaying={xPlaying} winner={winner} board={board}/>
      <Board board={board} onClick={handleBoxClick} />
      {gameOver &&  <button className="message play-again" onClick={resetBoard}><i class="fa-solid fa-rotate-right"></i> Play Again</button>}
      {/* {gameOver && <div className="message">Game Over! The board will reset.</div>} */}

    </div>
  );
}

export default App;
