import React, { Component } from 'react';
import './Scoreboard.css';

const initialState = {
    scores: [
      { id: 0, value1: 0, value2: 0, value3: 0 },
      { id: 1, value1: 0, value2: 0, value3: 0 },
      { id: 2, value1: 0, value2: 0, value3: 0 },
      { id: 3, value1: 0, value2: 0, value3: 0 },
      { id: 4, value1: 0, value2: 0, value3: 0 },
      { id: 5, value1: 0, value2: 0, value3: 0 },
      { id: 6, value1: 0, value2: 0, value3: 0 },
      { id: 7, value1: 0, value2: 0, value3: 0 },
      { id: 8, value1: 0, value2: 0, value3: 0 },
      { id: 9, value1: 0, value2: 0, value3: 0, value4: 0 },
    ],
    total: 0
};

class Scoreboard extends Component {

    state = initialState;

    inputHandler = (event, id, value) => {
        // declare score const that aligns with state score id
        const score = {
            ...this.state.scores[id]
        };
        
        console.log(event.target.value)
        if(event.target.value === 'x' || event.target.value === 'X') {
            score[value] = 10;
        }
        else if(event.target.value === '/' && value !== "value2") {
            score[value] = 10;
        }
        else {
            score[value] = event.target.value;
        }

        // recreate array const to properly mutate our state.
        // cannot update submembers of our state array.
        const scores = [...this.state.scores];
        scores[id] = score;

        // set state to new scores array
        this.setState({ scores }, () => {
            console.log(this.state);
        });
    }

    // calculate the user's score based on input values
    // values are stored in state.
    calculateScore = () => {
        // Check user input against initial state
        let total = 0;
        if(this.state === initialState) {
            console.log("no input");
            return;
        }

        for(var i = 0; i < this.state.scores.length; i++) {
            // if(this.state.scores[i].value1 === 0 || this.state.scores[i].value2 === 0 || this.state.scores[i].value3 === 0) {
            //     console.log('field is empty');
            //     break;
            // }

            // Handles the logic for the last two frames
            // if(i === this.state.scores.length-2) {
            //     let totalPins = 0;
            //     totalPins = parseInt(this.state.scores[i+1].value1) + parseInt(this.state.scores[i+1].value2) + parseInt(this.state.scores[i+1].value4);
            //     if(this.state.scores[i+1].value1 === 10) {
            //         total += (
            //             20 + parseInt(this.state.scores[i].value1) + totalPins
            //         );
            //     }
            //     else {
            //         console.log('else')
            //         total += (
            //             parseInt(this.state.scores[i].value1) +
            //             parseInt(this.state.scores[i+1].value1) +
            //             parseInt(this.state.scores[i+1].value2) +
            //             parseInt(this.state.scores[i+1].value4)
            //             + totalPins
            //         );
            //     }
            //     this.setState({ total }, () => {console.log("state total " + this.state.total)});
            //     console.log(this.state.total)
            //     return false;
            // }

            // Check strike
            if(this.state.scores[i].value1 === 10) {
                total += 10;
                // 9th frame
                if(i === this.state.scores.length-2) {
                    total += (parseInt(this.state.scores[i+1].value1) + parseInt(this.state.scores[i+1].value2));                    
                    this.setState({ total }, () => {console.log("state total " + this.state.total)});
                }
                // 10th frame
                else if(i === this.state.scores.length-1) {
                    // CSS rearranged my input elements that map value2 and value4, therefor swap here
                    if(this.state.scores[i].value4 === 10 && this.state.scores[i].value2 !== 10) {
                        // getting extremely unusual feedback from javascript, forcing me to divide and floor this number.
                        total += 20 + Math.floor(Number(this.state.scores[i].value2) / 11);
                        console.log(total);
                        this.setState({ total }, () => {console.log("state total " + this.state.total)});
                        return;
                    }
                    if(this.state.scores[i].value2 === 10 && this.state.scores[i].value4 !== 10) {
                        console.log('2')
                        total += parseInt(this.state.scores[i].value4);
                        this.setState({ total }, () => {console.log("state total " + this.state.total)});
                        return;
                    }
                    else {
                        console.log('3')
                        total += (parseInt(this.state.scores[i].value2) + parseInt(this.state.scores[i].value4));                      
                        this.setState({ total }, () => {console.log("state total " + this.state.total)});
                    }
                }
                else {
                    console.log('else')
                    total += (parseInt(this.state.scores[i+1].value1) + parseInt(this.state.scores[i+2].value1));
                    console.log("this total "+total)
                    this.setState({ total }, () => {console.log("state total " + this.state.total)});
                }
            }
            else if(this.state.scores[i].value1 >= 0 && this.state.scores[i].value1 < 10 && this.state.scores[i].value2 === '/') {
                console.log("spare");

                // add 10 to the value of the next shot taken
                total += (10 + parseInt(this.state.scores[i+1].value1));
                this.setState({ total }, () => {console.log("state total " + this.state.total)});
            }
            else if(this.state.scores[i].value1 >= 0 && this.state.scores[i].value1 < 10 && this.state.scores[i].value2 >= 0 && this.state.scores[i].value2 < 10 ){

                // parseInt used below to allow javascript to properly add the integers together, rather than concatenating them
                total += (parseInt(this.state.scores[i].value1) + parseInt(this.state.scores[i].value2));
                this.setState({ total }, () => {console.log("state total " + this.state.total)});
            }
        }
    }

    reset = () => {
        this.setState({ scores: initialState.scores, total: initialState.total });
    }

    render() {
        return (
            <div className="scoreboardContainer">
                <table className="scoreboard">
                    <thead>
                        <tr>
                            <th>1</th>
                            <th>2</th>
                            <th>3</th>
                            <th>4</th>
                            <th>5</th>
                            <th>6</th>
                            <th>7</th>
                            <th>8</th>
                            <th>9</th>
                            <th>10</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {Object.keys(this.state.scores).map((id) => {
                                if(id == 9) {
                                    return(
                                        <td key={id}>
                                            <input
                                                className="leftInput"
                                                type="text"
                                                onChange={(e) => this.inputHandler(e, id, "value1")} 
                                            />
                                            <div className="rightInputContainer">
                                                <input
                                                    type="text"
                                                    onChange={(e) => this.inputHandler(e, id, "value2")}
                                                />
                                            </div>
                                            <div className="rightInputContainer">
                                                <input
                                                    type="text"
                                                    onChange={(e) => this.inputHandler(e, id, "value4")}
                                                />
                                            </div>
                                        </td>
                                    );
                                }
                                else {
                                    return (
                                        <td key={id}>
                                            <input
                                                className="leftInput"
                                                type="text"
                                                onChange={(e) => this.inputHandler(e, id, "value1")} 
                                            />
                                            <div className="rightInputContainer">
                                                <input
                                                    type="text"
                                                    onChange={(e) => this.inputHandler(e, id, "value2")}
                                                />
                                            </div>
                                        </td>
                                    )
                                }
                            })}
                        </tr>
                        <tr>
                            {Object.keys(this.state.scores).map((id) => {
                                return (
                                    <td key={id}>
                                        <input
                                            className="bottomInput"
                                            type="number"
                                            onChange={(e) => this.inputHandler(e, id, "value3")}
                                        />
                                    </td>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>
                <br/>
                <div>
                    <button className="btn" onClick={() => this.calculateScore()}>Calculate Score</button>
                    <button className="btn" onClick={() => this.reset()}>Reset</button>
                </div>
            </div>
        );
    }
}

export default Scoreboard;