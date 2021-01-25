import React, {memo} from 'react';
//state를 안 쓰면 class보단 함수형 component표현하기도 한다.
//memo 를 사용하면 pureComponent랑 똑같은 기능, HOC(higher order component)라 불린다
const Ball = memo(({number}) => {
    let background;
    if(number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }
    return (
        <div className="ball" style={{background}}>{number}</div>
    );
});

// import React, {PureComponent} from 'react';

// class Ball extends PureComponent {
//     render() {
//         const {number} = this.props;
//         let background;
//         if(number <= 10) {
//             background = 'red';
//         } else if (number <= 20) {
//             background = 'orange';
//         } else if (number <= 30) {
//             background = 'yellow';
//         } else if (number <= 40) {
//             background = 'blue';
//         } else {
//             background = 'green';
//         }
//         return (
//             <div className="ball" style={{background}}>{number}</div>
//         );
//     }
// }



export default Ball;
