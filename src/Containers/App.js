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
            <li>Enter <span className="red">X</span> in the first box for a <span className="red">strike</span>.</li>
            <li>Enter <span className="green">0-9</span> in the first box, followed by a <span className="green">/</span> in the second box for a <span className="green">spare</span>.</li>
            <li>Enter <span className="green">0-9</span> in the respective boxes for each shot if it's neither a strike or a spare.</li>
            <li>Use the bottom row of textboxes to test your scoring knowledge against the actual score.</li>
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
