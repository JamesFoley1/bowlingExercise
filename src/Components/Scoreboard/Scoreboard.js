import React from 'react';
import './Scoreboard.css';

const Scoreboard = (props) => {
    return (
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
                    <td>
                        <input className="leftInput" type="text"></input>
                        <div className="rightInputContainer">
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <input className="leftInput" type="text"></input>
                        <div className="rightInputContainer">
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <input className="leftInput" type="text"></input>
                        <div className="rightInputContainer">
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <input className="leftInput" type="text"></input>
                        <div className="rightInputContainer">
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <input className="leftInput" type="text"></input>
                        <div className="rightInputContainer">
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <input className="leftInput" type="text"></input>
                        <div className="rightInputContainer">
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <input className="leftInput" type="text"></input>
                        <div className="rightInputContainer">
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <input className="leftInput" type="text"></input>
                        <div className="rightInputContainer">
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <input className="leftInput" type="text"></input>
                        <div className="rightInputContainer">
                            <input type="text"></input>
                        </div>
                    </td>
                    <td>
                        <input className="leftInput" type="text"></input>
                        <div className="rightInputContainer">
                            <input type="text"></input>
                        </div>
                    </td>
                    
                </tr>
                <tr>
                    <td>
                        <input className="bottomInput" type="text"></input>
                    </td>
                    <td>
                        <input className="bottomInput" type="text"></input>
                    </td>
                    <td>
                        <input className="bottomInput" type="text"></input>
                    </td>
                    <td>
                        <input className="bottomInput" type="text"></input>
                    </td>
                    <td>
                        <input className="bottomInput" type="text"></input>
                    </td>
                    <td>
                        <input className="bottomInput" type="text"></input>
                    </td>
                    <td>
                        <input className="bottomInput" type="text"></input>
                    </td>
                    <td>
                        <input className="bottomInput" type="text"></input>
                    </td>
                    <td>
                        <input className="bottomInput" type="text"></input>
                    </td>
                    <td>
                        <input className="bottomInput" type="text"></input>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default Scoreboard;