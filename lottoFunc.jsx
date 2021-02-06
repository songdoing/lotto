import React, { useState, useRef, useEffect, useMemo } from 'react';
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
    //rendering 될때마다 getWinNumbers가 계속 실행됨..그래서 useMemo를 사용
    //return하는 값을 기억해둘수 있다, 두번째인자(배열)가 바뀌지 않는한 getWinNumbers는 다시실행 않는다
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    // const [winNumbers, setWinNumbers] = useState(getWinNumbers());
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(() => {
        console.log('useEffect');
        for(let i =0; i < winNumbers.length-1; i++ ) {
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, 1000 * (i+1));
        }
        timeouts.current[6] =setTimeout(()=> {
            setBonus(winNumbers[6]);
            setRedo(true);           
        }, 7000);
        //return을 써주면 componentWillUnmount 실행
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            });
        };
    }, [timeouts.current]); //배열의 요소가 바뀌는 시점에 compoentnDidUpdate실행
    //lottoClass.jsx처럼 winBalls.length === 0 하게 되면 useEffect가 2번 실행되어..ㅠㅠ
    //componentDidUpdate의 요소를 class컴퍼넌트와 같지 않을수도있다.
    //두번째 인자가 빈배열이면, componentDidMount와 동일
    //빈배열에 요소가 있으면, componentDidMount와 componentDidUpdate둘다

    const onClickRedo = () => {
        console.log('clickRedo');
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = []; //timeouts.current가 바뀌는 시점
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