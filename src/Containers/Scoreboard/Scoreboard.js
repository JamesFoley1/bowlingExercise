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
    total: 0,
    windowWidth: window.innerWidth
};

class Scoreboard extends Component {

    state = initialState;
    componentDidMount() {
        window.addEventListener("resize", this.updatePredicate);
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updatePredicate);
    }

    updatePredicate = () => {
        this.setState({ windowWidth: window.innerWidth });
    }

    // change state when input is detected
    inputHandler = (event, id, value) => {
        // declare score const that aligns with state score id
        const score = {
            ...this.state.scores[id]
        };
        
        if(event.target.value === 'x' || event.target.value === 'X') {
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
        this.setState({ scores });
    }

    strikeChecker = (id, total) => {
        total += 10;
        // 9th frame
        if(id === this.state.scores.length-2) {
            total += (parseInt(this.state.scores[id+1].value1) + parseInt(this.state.scores[id+1].value2));
            this.setState({ total });
            return total;
        }
        // 10th frame
        else if(id === this.state.scores.length-1) {
            // CSS rearranged my input elements that map value2 and value4, therefor swap here
            if(this.state.scores[id].value4 === 10 && this.state.scores[id].value2 !== 10) {
                // getting extremely unusual feedback from javascript, forcing me to divide and floor this number.
                total += 20 + Math.floor(Number(this.state.scores[id].value2) / 11);
                this.setState({ total });
                return total;
            }
            // check if last shot is a a strike 
            if(this.state.scores[id].value2 === 10 && this.state.scores[id].value4 !== 10) {
                total += Number(this.state.scores[id].value4);
                this.setState({ total });
                return total;
            }
            // check if last shot is a spare
            if(this.state.scores[id].value2 === '/'){
                total += 10;
                this.setState({ total });
                return total;
            }
            else {
                total += (parseInt(this.state.scores[id].value2) + parseInt(this.state.scores[id].value4));                      
                this.setState({ total });
                return total;
            }
        }
        else {
            // // If next shot is a strike
            if(this.state.scores[id+1].value1 === 10) {
                total += (parseInt(this.state.scores[id+1].value1) + parseInt(this.state.scores[id+2].value1));
                this.setState({ total });
            }

            // If next shot is a spare
            else if(this.state.scores[id+1].value2 === "/") {
                total += 10
                this.setState({ total });
            }

            else {
                total += (parseInt(this.state.scores[id+1].value1) + parseInt(this.state.scores[id+1].value2));
                this.setState({ total });
            }
        }
        return total;
    }

    spareChecker = (id, total) => {
        total += 10;
        // next frame contains a strike
        if(this.state.scores[id+1].value1 === 10) {
            total += 10;
        }
        else {
            total += parseInt(this.state.scores[id+1].value1);
        }
        this.setState({ total });
        return total;
    }

    // calculate the user's score based on input values
    // values are stored in state.
    calculateScore = () => {
        // Check user input against initial state
        let total = 0;
        if(this.state === initialState) {
            return;
        }

        for(var i = 0; i < this.state.scores.length; i++) {
            // Check strike
            if(this.state.scores[i].value1 === 10) {
                total = this.strikeChecker(i, total);
            }

            // Check for spare
            else if(this.state.scores[i].value1 >= 0 && this.state.scores[i].value1 < 10 && this.state.scores[i].value2 === '/') {
                total = this.spareChecker(i, total);
            }

            // Check spare on last frame
            else if(this.state.scores[i].value1 >= 0 && this.state.scores[i].value1 < 10 && this.state.scores[i].value4 === '/') {
                total += 10 + parseInt(this.state.scores[i].value2);
                this.setState({ total });
                return;
            }
            // Check to see if input values are in range of 0-9
            else if(this.state.scores[i].value1 >= 0 && this.state.scores[i].value1 < 10 && this.state.scores[i].value2 >= 0 && this.state.scores[i].value2 < 10 ){
                // Last frame. Using value4 since css rearranges my boxes with dynamic loading
                if(i === this.state.scores.length-1) {
                    total += (parseInt(this.state.scores[i].value1) + parseInt(this.state.scores[i].value4));
                }
                else {
                    total += (parseInt(this.state.scores[i].value1) + parseInt(this.state.scores[i].value2));
                }
                this.setState({ total });
            }
        } // end for loop
        console.log("total " + total);

    }

    // reset state to initial state values
    reset = () => {
        this.setState(initialState);
    }

    render() {
        // Check window width and determine which scoreboard to render
        if(this.state.windowWidth < 991) {
            return (
                <div className="scoreboardContainer">
                    <table className="scoreboard">
                        <thead>
                            <tr>
                                <th>1</th>
                                <th>2</th>
                                <th>3</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {Object.keys(this.state.scores.slice(0,3)).map((id) => {
                                    return (
                                        <td key={id}>
                                            <input
                                                className="leftInput"
                                                type="text"
                                                value={this.state.scores[id].value1}
                                                onChange={(e) => this.inputHandler(e, id, "value1")} 
                                            />
                                            <div className="rightInputContainer">
                                                <input
                                                    type="text"
                                                    value={this.state.scores[id].value2}
                                                    onChange={(e) => this.inputHandler(e, id, "value2")}
                                                />
                                            </div>
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr>
                                {Object.keys(this.state.scores.slice(0,3)).map((id) => {
                                    return (
                                        <td key={id}>
                                            <input
                                                className="bottomInput"
                                                type="number"
                                                value={this.state.scores[id].value3}
                                                onChange={(e) => this.inputHandler(e, id, "value3")}
                                            />
                                        </td>
                                    )
                                })}
                            </tr>
                        </tbody>
                    </table>
                    <table className="scoreboard">
                        <thead>
                            <tr>
                                <th>4</th>
                                <th>5</th>
                                <th>6</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {Object.keys(this.state.scores.slice(3,6)).map((id) => {
                                    return (
                                        <td key={Number(id)+3}>
                                            <input
                                                className="leftInput"
                                                type="text"
                                                value={this.state.scores[Number(id)+3].value1}
                                                onChange={(e) => this.inputHandler(e, Number(id)+3, "value1")} 
                                            />
                                            <div className="rightInputContainer">
                                                <input
                                                    type="text"
                                                    value={this.state.scores[Number(id)+3].value2}
                                                    onChange={(e) => this.inputHandler(e, Number(id)+3, "value2")}
                                                />
                                            </div>
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr>
                                {Object.keys(this.state.scores.slice(3,6)).map((id) => {
                                    return (
                                        <td key={Number(id)+3}>
                                            <input
                                                className="bottomInput"
                                                type="number"
                                                value={this.state.scores[Number(id)+3].value3}
                                                onChange={(e) => this.inputHandler(e, Number(id)+3, "value3")}
                                            />
                                        </td>
                                    )
                                })}
                            </tr>
                        </tbody>
                    </table>
                    <table className="scoreboard">
                        <thead>
                            <tr>
                                <th>7</th>
                                <th>8</th>
                                <th>9</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {Object.keys(this.state.scores.slice(6,9)).map((id) => {
                                    return (
                                        <td key={Number(id)+6}>
                                            <input
                                                className="leftInput"
                                                type="text"
                                                value={this.state.scores[Number(id)+6].value1}
                                                onChange={(e) => this.inputHandler(e, Number(id)+6, "value1")} 
                                            />
                                            <div className="rightInputContainer">
                                                <input
                                                    type="text"
                                                    value={this.state.scores[Number(id)+6].value2}
                                                    onChange={(e) => this.inputHandler(e, Number(id)+6, "value2")}
                                                />
                                            </div>
                                        </td>
                                    )
                                })}
                            </tr>
                            <tr>
                                {Object.keys(this.state.scores.slice(6,9)).map((id) => {
                                    return (
                                        <td key={Number(id)+6}>
                                            <input
                                                className="bottomInput"
                                                type="number"
                                                value={this.state.scores[Number(id)+6].value3}
                                                onChange={(e) => this.inputHandler(e, Number(id)+6, "value3")}
                                            />
                                        </td>
                                    )
                                })}
                            </tr>
                        </tbody>
                    </table>
                    <table className="scoreboard">
                        <thead>
                            <tr>
                                <th>10</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        className="leftInput"
                                        type="text"
                                        value={this.state.scores[9].value1}
                                        onChange={(e) => this.inputHandler(e, 9, "value1")} 
                                    />
                                    <div className="rightInputContainer">
                                        <input
                                            type="text"
                                            value={this.state.scores[9].value2}
                                            onChange={(e) => this.inputHandler(e, 9, "value2")}
                                        />
                                    </div>
                                    <div className="rightInputContainer">
                                        <input
                                            type="text"
                                            value={this.state.scores[9].value4}
                                            onChange={(e) => this.inputHandler(e, 9, "value4")}
                                        />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input
                                        className="bottomInput"
                                        type="number"
                                        value={this.state.scores[9].value3}
                                        onChange={(e) => this.inputHandler(e, 9, "value3")}
                                    />
                                </td>
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
        else {
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
                                                    value={this.state.scores[id].value1}
                                                    onChange={(e) => this.inputHandler(e, id, "value1")} 
                                                />
                                                <div className="rightInputContainer">
                                                    <input
                                                        type="text"
                                                        value={this.state.scores[id].value2}
                                                        onChange={(e) => this.inputHandler(e, id, "value2")}
                                                    />
                                                </div>
                                                <div className="rightInputContainer">
                                                    <input
                                                        type="text"
                                                        value={this.state.scores[id].value4}
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
                                                    value={this.state.scores[id].value1}
                                                    onChange={(e) => this.inputHandler(e, id, "value1")} 
                                                />
                                                <div className="rightInputContainer">
                                                    <input
                                                        type="text"
                                                        value={this.state.scores[id].value2}
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
                                                value={this.state.scores[id].value3}
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
}

export default Scoreboard;