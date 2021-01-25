import React, { Component } from 'react';
import Ball from './ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i) => i +1);
    const shuffle = [];
    while(candidate.length >0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length -1];
    const winNumbers = shuffle.slice(0,6).sort((p,c) => p -c);
    return [...winNumbers, bonusNumber];
}
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
                <button onClick={redo ? this.onClickRedo : () =>{}}>Try again!</button>
            </>
        );
    }
}
export default Lotto;