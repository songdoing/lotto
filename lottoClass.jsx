import React, { Component } from 'react'

class Lotto extends Component {
    state = {
        winNumbers : getWinNumbers(),
        winBalls : [],
        bonus : null,
        redo : false,
    };
    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>Win Numbers</div>
                <div id="result">
                    {winBalls.map((v) =><Ball key={v} number={v} />)}
                </div>
                <div>Bonus!</div>
                {bonus && <Ball number={bonus}/>}
         
            </>
        );
    }
}
export default Lotto;