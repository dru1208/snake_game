import React from 'react';
import './App.css';
import GameBoard from "./GameBoard.jsx"

function App() {
  return (
    <div className="App">
      <div className="appHeader">Snake Game</div>
      <GameBoard />
    </div>
  );
}

export default App;
