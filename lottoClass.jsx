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

    timeouts = [];

    runTimeouts = () => {
        console.log('runTimeouts');
        const { winNumbers } = this.state;
        for(let i =0; i < winNumbers.length-1; i++ ) {
            this.timeouts[i] = setTimeout(() => {
                this.setState((prevState) => {
                    return{
                        winBalls: [...prevState.winBalls, winNumbers[i]],
                    };                   
                });
            }, 1000 * (i+1));
        }
        this.timeouts[6] =setTimeout(()=> {
            this.setState({
                bonus : winNumbers[6],
                redo : true,
            });            
        }, 7000);
    }

// 만약 부모component가 자식component를 삭제햇는데, 자식component안에 setTimeout이나
// setinterval를 삭제 안 해주면 메모리 문제가 오류가 생김.
// 그래서 꼭 componentWillUnmount에서 clearTimeout를 해줘야 함.
    componentDidMount() {
        console.log('didMount');
        this.runTimeouts();
        console.log('lotto numbers generated.');
    }
//class에서는 componentDidUpdate에 한꺼번에 써주지만,
//function에서는 두개의 useEffect를 써야함
    componentDidUpdate(prevProps, prevState) {
        console.log('didUpdate');
        //this.state.winBalls.lengths === 0 조건해도 됨.
        if(this.timeouts.length === 0) {
            this.runTimeouts();
        }

        if(prevState.winNumbers !== this.state.winNumbers) {
            console.log('lotto numbers generated.');
        }
    }

    componentWillUnmount() {
        this.timeouts.forEach((v) => {
            clearTimeout(v);
        });
    }

    onClickRedo = () => {
        console.log('clickRedo');
        this.setState({
            winNumbers : getWinNumbers(),
            winBalls : [],
            bonus : null,
            redo : false,
        });
        this.timeouts = [];
    };

    render() {
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <h1>Lotto numbers Generator</h1>
                <div>Win Numbers</div>
                <div id="result">
                    {winBalls.map((v) =><Ball key={v} number={v} />)}
                </div>
                <div>Bonus!</div>
                {bonus && <Ball number={bonus}/>}
                {redo && <button onClick={this.onClickRedo}>Try again!</button>}
            </>
        );
    }
}
export default Lotto;