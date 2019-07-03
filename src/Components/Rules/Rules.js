import React from 'react';
import './Rules.css';

const Rules = () => {
    return (
        <div className="rulesContainer">
            <h2>Scoring Rules</h2>

            <h3>Strike</h3>
            <p>If you knock down all 10 pins in the first shot of a frame, you get a strike.</p>
            <p><u><em>How to Score:</em></u> A strike earns 10 points <em>plus the sum of your next two shots.</em></p>

            <h3>Spare</h3>
            <p>If you knock down all 10 pins using both shots of a frame, you get a spare.</p>
            <p><u><em>How to Score:</em></u> A spare earns 10 points <em>plus the sum of your next one shot.</em></p>

            <h3>Open Frame</h3>
            <p>If you do not knock down all 10 pins using both shots of your frame (9 or fewer pins knocked down), you have an open frame.</p>
            <p><u><em>How to Score:</em></u> An open frame only earns the number of pins knocked down.</p>

            <h3>The 10th Frame</h3>
            <p>The 10th frame is a bit different: </p>
            <p>If you roll a strike in the first shot of the 10th frame, you get 2 more shots.</p>
            <p>If you roll a spare in the first two shots of the 10th frame, you get 1 more shot.</p>
            <p>If you leave the 10th frame open after two shots, the game is over and you do not get an additional shot.</p>
            <p><u><em>How to Score:</em></u> The score for the 10th frame is the total number of pins knocked down in the 10th frame.</p>
        </div>
    );
}

export default Rules;