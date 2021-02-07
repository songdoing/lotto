import React, { useState, useRef, useEffect, useMemo, useCallBack } from 'react';
import Ball from './ball';
//useMemo는 함수의 리턴값을 기억한다, 두번째 인자 바뀌기 전까지
//useEffect는 componentDidMount때 무조건 실행되고, 두번째 인자가 바뀔때, componentDidUpdate처럼 다시실행한다(여러번 쓰도됨)
//useCallBack은 함수자체를 기억한다, 두번째 인자가 바뀌기 전까지
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
//hooks들은 순서가 중요하다
//조건문 안에 절대 넣으면 안 되고, 함수나 반복문 안에도 웬만하면 사용자제
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

    //componentDidMount만 하고, componentDidUpdate는 안하는 꼼수
        // useEffect(() => {
        //     ajax요청
        // }, []);

    //componentDidUpdate만 하고, componentDidMount는 안하는 꼼수
        // const mounted = useRef(false);
        // useEffect(() => {
        //     if(!mounted.current) {
        //         mounted.current = true; 일단 실행될때 아무것도 이뤄나지 않는다.
        //     } else {
        //         ajax요청
        //     }
        // }, [바뀌는 값]);

//useEffect, useMemo, useCallBack안에 useState()쓰면 안됨
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
    useEffect(() => {
        console.log('lotto numbers generated.');
    }, [winNumbers]);
    
    //useCallBack은 함수자체를 기억하는 것.
    const onClickRedo = useCallBack(() => {
        console.log('clickRedo');
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = []; //timeouts.current가 바뀌는 시점
    }, [winNumbers]);
    //두번째 인자를 빈 배열을 두면 절대로 잊지 않는다 그럼 안돼
    //winNumbers를 넣으면(state로 쓰이는 거), 변할때마다 최신것을 기억한다
    //자식컴퍼넌트(ex, ball.jsx)에 props로 함수를 넘길때는 useCallBack를 꼭 사용
    //안그럼 자식이 매번 함수(props)가 바뀌는 구나,,하고 매번 render함
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