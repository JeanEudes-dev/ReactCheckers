import React from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  return (
    <div className="App">
      <h1>React Checkers Game</h1>
      <Board size={8} />
    </div>
  );
}

export default App;
