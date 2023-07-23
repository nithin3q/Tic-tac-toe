import React, { useEffect } from 'react';
import './Scoreboard.css';
import ConfettiGenerator from 'confetti-js';

export const Scoreboard = ({ scores, xPlaying, winner,board }) => {
  

  useEffect(() => {
    if (winner) {
      triggerConfetti();
    }
  }, [winner]);

  const triggerConfetti = () => {
    const confettiSettings = {
      target: 'confetti-canvas',
      max: 180,
      size: 1.4,
      animate: true,
      props: ['circle', 'square', 'triangle', 'line'],
      colors: [[255, 0, 0], [0, 255, 0], [0, 90, 255],[0, 200, 255],[200, 0, 80],[100, 100, 100],[0, 0, 0],[89, 23, 76],[180, 56, 255],], // You can define your custom colors here
      clock: 40,
    };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();
  };
  const hasNullValues = board.includes(null);
  const isDraw = !hasNullValues && !winner;

  return (
    <div>
    {winner && <canvas id="confetti-canvas"></canvas>}
    <div className='scoreboard'>
      {winner ? (
        <div className='winner-message'>{winner === 'x' ? 'X wins!' : 'O wins!'}</div>
      ) : (
        <div>
          {isDraw ? (
            <div className='draw-message'>It's a draw!</div>
          ) : (
            <>
              <span className={`score x-score ${!xPlaying && 'inactive'}`}>
                {xPlaying ? "X's turn" : ''}
              </span>
              <span className={`score o-score ${xPlaying && 'inactive'}`}>
                {!xPlaying ? "O's turn" : ''}
              </span>
            </>
          )}
        </div>
      )}
    </div>
  </div>
  );
};
