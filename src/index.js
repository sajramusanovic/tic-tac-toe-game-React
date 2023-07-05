import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

// square komponenta
// 19. linija {props.value} je umjesto x znaci izvlaci vrijednost propsa a to je x
const Square = (props) => {
// inicijalna vr je nula, ova funkcija vraca niz sa 2 vr: 1. je trenutna (value) vr a druga je ona koju dodjeljujemo (setValue) :
// const [value, setValue] = useState(null); 

  return (
    <button 
    className="square"
    onClick={props.onClickEvent} // kada je polje kliknuto pojavljuje se X 
    >
      {props.value} 
    </button>
  );
};

// board komponenta iznad game komponente
const Board = () => {
  const initialSquares = Array(9).fill(null); // niz od 9 nula
  const[squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true); // odr. kada je X na potezu, xIsNext je bool dt, true znaci da x igra prvi

  const handleClickEvent = (i) => {
    // 1. make a copy of squares state array
    const newSquares = [...squares];

    const winnerDeclared = Boolean(calculateWinner(newSquares));
    const squareFilled = Boolean(newSquares[i]);
    if(winnerDeclared || squareFilled) {
      return;
    }

    // 2. mutate the copy, setting the i-th element to 'X'
    newSquares[i] = xIsNext ? 'X' : 'O';

    // 3. call the setSquares function with the mutated  copy
    setSquares(newSquares);
    setXIsNext(!xIsNext);

  };

  const renderSquare = (i) => {
    return (
      <Square 
      value = {squares[i]} 
      onClickEvent = {() => handleClickEvent(i)}
      /> // kvadratici vise ne pokazuju brojeve, prazni su zbog ovog
    );
  };

  const winner = calculateWinner(squares);
  const status = winner ?
  `Winner: ${winner}` :
  `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
      {renderSquare(0)}{renderSquare(1)}{renderSquare(2)} 
      </div>  

      <div className="board-row">
      {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}  
      </div> 

      <div className="board-row">
      {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}   
      </div> 

    </div>
  );
};

// game komponenta
const Game = () => {
  return (
    <div className="game">
      iks-oks game
      <Board />
    </div>
  );
};

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// funkcija koja odr. pobjednika
function calculateWinner(squares) {
    const lines = [ // ispisujemo kombinacije s kojim se moze pobijediti
      [0,1,2], [3,4,5], [6,7,8], // redovi
      [0,3,6], [1,4,7], [2,5,8], // kolone
      [0,4,8], [2,4,6], // dijagonale
    ];

    for (let line of lines) {
      const [a,b,c] = line;

      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a]; // 'X' ili 'O'
      }
    }

    return null;
}