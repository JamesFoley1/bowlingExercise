import React from 'react';
import './App.css';
import Scoreboard from '../Components/Scoreboard/Scoreboard';

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Rules To Keep Score While Bowling</h1>
      </header>
      <div className="body">
        <ul className="instructions">
          <li>Enter X in the first box for a strike.</li>
          <li>Enter 0-9 in the first box, then a / in the second box for a spare.</li>
          <li>Enter 0-9 in the respective boxes for each shot if it's neither a strike or a spare.</li>
          <li>Use the bottom textbox for your total for that round.</li>
        </ul>
        <Scoreboard />
      </div>
    </div>
  );
}

export default App;
