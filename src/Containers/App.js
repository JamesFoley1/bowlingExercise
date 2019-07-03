import React, { Component } from 'react';
import './App.css';
import Scoreboard from './Scoreboard/Scoreboard';
import Rules from '../Components/Rules/Rules';

class App extends Component {
  // state = initialState;

  render() {
    return (
      <div className="App">
        <header className="header">
          <h1>How To Keep Score In Bowling</h1>
        </header>
        <div className="body">
          <h2>Instructions</h2>
          <ul className="instructions">
            <li>Enter X in the first box for a strike.</li>
            <li>Enter 0-9 in the first box, then a / in the second box for a spare.</li>
            <li>Enter 0-9 in the respective boxes for each shot if it's neither a strike or a spare.</li>
            <li>Use the bottom textbox for your total for that round.</li>
          </ul>
          <p>Below is a bowling scoreboard. You can enter in values to simulate a game and click "Calculate Score" to see the results. To test your scoring abilities, you can enter in the score for each frame in the bottom row of textboxes to see if they match the actual scores.</p>
          <h2>Scoreboard</h2>
          <Scoreboard />
          <br/>
          <Rules />
        </div>
      </div>
    );
  }
}

export default App;
