'use strict'

/*  async await : 깔끔하게 promise를 사용하는 것
    무조건 async await를 쓰라는게 아닌, 상황에따라 쓰라는 것!
    promise들을 간편하게 동기적으로 실행되는것처럼 보여지게함
    promise 체이닝 가능 -> then, then, then ... 난잡함! async await를 사용하면 동기적으로 사용하게끔 만듬
    promise위에 간편 API를 제공하는 것. 기존에 존재하는걸 감싸서 간편 API를 제공하는 거 -> syntactic sugar
    */
/*
    1.async
    오래걸리는 일을 비동기적으로 처리해야 함!!!
    Promise를 쓰면 되는데 더 간편하게 비동기를 작성하는 방법 있음 = 함수앞에async를 붙여주면 됨
    async를 function앞에 쓰면 프로미쓰로 바뀜...

 */
async function  fetchUser(){  //비동기적 처리를 안하면 자바는 동기적이기때문에 한줄 한줄씩..
    // return new Promise((resolve, reject)=>{ //resolve랑 reject안쓰면 콘쏠에는 pending상태!그러니 완료해줘야함
        return ('kimJH')
    // })
}
const user = fetchUser();  //user변수의 함수 실행!
user.then(console.log)
console.log(user)

/*
    2. await
    ~~초가 지나길 기다리면(await) 밑에거 return!
 */

function delay(ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}
async function getApple(){
    await delay(1000)  //3초가 지나면 사과를 리턴하는 프로미스(에이싱크가있으니)
    return '사과';
}
async function getBanana(){  //위랑 같음
    await delay(1000); //3초 갈때까지 기다려!
    return ('바나나'); //그후에 바나나 리턴
}
//프로미스도 너무 중첩하면 콜백지옥이 됨. => async 사용.
function pickFruits(){
    return getApple().then(apple => {
        return getBanana().then(banana => `${apple}+${banana}`)
    });
}

//async이용해 간단히 만드는 법
async function pickFruits(){
    const applePromise = getApple(); //사과프로미스를 만들고
    const bananaPromise = getBanana(); //바나나프로미스 만들어서

    const apple = await applePromise; //사과프로미스와
    const banana = await bananaPromise; //바나나프로미스를 동기화 시켜줌
    return `${apple}+${banana}`;  //그럼 동기적으로 일어남.
}
pickFruits().then(console.log)  //4초후 사과바나나 뜸

//근데 위에껀 너무 더러운 코드임; 동시에 일어나려면 Promise.all을 씀!

/*
    3. Promise API : 동시다발적으로 실행 Promise.all
    프로미스 All을 사용하면 동시다발적으로 실행하게 함!
     Promise.all([함수, 함수])

    */
function  pickAllFruits(){
    return Promise.all([getApple(), getBanana()])  //배열안에 함수들 넣고
        .then(fruits => fruits.join('+'));  //조인으로 묶어주면
}
pickAllFruits().then(console.log)

/*  4. Promise API : 하나만 나오게 하기Promise.race */
function pickOnlyOne(){
    return Promise.race([getApple(),getBanana()]);
}
pickOnlyOne().then(console.log)