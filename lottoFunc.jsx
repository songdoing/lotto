import React, { useState, useRef, useEffect } from 'react';
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

const Lotto = () => {
    const [winNumbers, setWinNumbers] = useState(getWinNumbers());
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    const onClickRedo = () => {
        console.log('clickRedo');
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    };
    
    return (
        <>
            <h1>Lotto numbers Generator</h1>
            <div>Win Numbers</div>
            <div id="result">
                {winBalls.map((v) =><Ball key={v} number={v} />)}
            </div>
            <div>Bonus!</div>
            {bonus && <Ball number={bonus}/>}
            {redo && <button onClick={onClickRedo}>Try again!</button>}
        </>
    );
};

export default Lotto;