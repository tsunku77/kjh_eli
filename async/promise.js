'use strict';

/*  Promise : ES6. 비동기작업의 최종 완료 or 실패를 나타내는 객체
    정해진 장시간 기능 후 성공메시지와 함께 처리값(성공/실패)를 전달
    <callback안 쓰고 깔끔하게 비동기코드를 처리하는 방법>

    *state가 성공 실패를 알려줌
    만들어져서 운영중일땐 Pending / 성공적으로 끝내면 fulfilled / 문제생기면 rejected

    *데이터 producing vs consumer
    promise는 executor라는 콜백함수를 전달해줘야 함 - resolve(값 - 성공) / reject(오류)

    1. Producer
    새로운 promise가 만들어지면 executor함수가 바로 실행됨!
    **헤비한건 시간이 걸리니 동기처리시 다음라인에 코드가 실행안됨. ->Promise(비동기적)처리해야 함!
*/

//새로 프로그램 만들어지면 executor가 바로 실행!!
const promiseTest = new Promise((resolve, reject) => {  //성공,실패 순서로 넣음
    console.log('뭔가 하는 중');
    setTimeout(()=>{
        resolve('성공적입니다 ^^');
        // reject(new Error('실패했습니다 ㅠㅠ')) //Error객체는 Js에서 제공하는 객체
    },1000)
})
/* 2.Consumers : thenm catch, finally를 통해 값을 받아옴

  */
promiseTest
    .then((value)=>{  //resolve값이 value로 들어옴 //then호출시 같은 promise를 리턴하니 그것의 캐치를 출력할 수 있음
    console.log(value)
    })
    .catch(error =>{   //then과 catch로 원하는값과 실패를 출력할 수 있음.
    console.log(error)
    })
    .finally(()=>{      //성공 실패하든 마지막에 호출되는 것.
        console.log('finally')
    })

/* 3. Promise Chaining
   서버->숫자 가져오는 새로운 프로미스
* */
const fetchNumber = new Promise((resolve,reject)=>{
    setTimeout(()=> resolve(1) ,1000)
})
fetchNumber
    .then(num => num*2)  //성공적이면 2배로 곱하고  2
    .then(num => num*3)  //그 num을 3배로 곱하고   6
    .then(num => {       //그 num을 새로운 프로미스를 다른 서버와 통신할꺼임. 셋타임아웃으로 //6전달
        return new Promise((resolve,reject)=>{   //숫자에서-1을 뺀걸 다시 받고  //5
            setTimeout(()=> resolve(num-1),1000);  
        })
    })
    .then(num => console.log(num))   //그 숫자 출력  5출력
//then은 값뿐 아니라 promise를 전달할수도 있음

/* 4.Error 핸들링 */

const getHen = () =>
    new Promise((resolve, reject)=>{
        setTimeout(() => resolve('닭'),1000)
    });

const getEgg = hen =>
    new Promise((resolve, reject)=>{
        setTimeout(() => reject(new Error(`에러! ${hen}=>달걀`)),1000)
    });
const cook = egg =>
    new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${egg}=>후라이`),1000)
    })

getHen()
    .then(getEgg) //catch를 작성해 바로바로 문제를 해결할 수 있음 계란을 받는걸 실패했으니.
    .catch(error => {
        return '빵';
    })
    .then(cook)
    .then(console.log)
    .catch(console.log);
