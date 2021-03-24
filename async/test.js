'use strict'

/*mdn promise 공부*/
//promise쓰면 비동기를 동기처럼 반환가능
//최종결과 반환x 프프로미스를 반환해 미래 어떤 시점에 결과를 제공

/*  Promise의 3대 상태
    pending대기. fulfiled이행. rejected.거부*/

/*  Promise의 메서드들
    - Promise.all(iterable) : 동시다발적 이행!
    - Promise.race(iterable) : 하나만 나오게 하기
    - Promise.reject()
    - Promise.resolve()
* */

let myPromise = new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve('성공')
    },1000)
});

myPromise.then((msg)=>{
    console.log('굿굿'+msg);
})

/* 캡틴판교 promise */
/*예제1 리솔브*/
function  getData(){
    return new Promise((resolve, reject)=>{
        var data=100;
        resolve(data);
    });
}

getData().then((resolvedData) =>
    console.log(resolvedData)
)

/*예제2 리젝트*/
function getData2(){
    return new Promise((resolve, reject)=>{
        reject(new Error('에러'))
    })
}

getData2().then().catch((err)=>{
    console.log(err)
})

/*예제3 주소가...ㅜ*/
function getData3(){
    return new Promise((resolve, reject)=>{
        $.get('http://naver.com', (response)=>{
            if(response){
                resolve(response);
            }
            reject(new Error('에러!'))
        })
    })
}
getData3()
    .then((data)=>{
        console.log(data);
    })
    .catch((err)=>{
        console.log(err)
    })

/*예제4. setTimeout으로 1초후 호출*/
function getData5(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(1)
        },1000)
    })
}
getData5()
    .then((result)=>{
        console.log(result)
        return result + 10;
    })
    .then((result)=>{
        console.log(result)
        return result + 20;
    })
    .then((result)=>{
        console.log(result);
    })

/*예제5 에러구하는 법. */
function getData4(){
    return new Promise((resolve, reject)=>{
        reject('실패^^')
    })
}
getData4().then().catch((err)=>{
    console.log(err)
})

/*예제6. 가급적 에러는 catch()를 사용 */
function  getData6(){
    return new Promise((resolve, reject)=>{
        resolve('hi')
    })
}
getData6().then((result)=>{
    console.log(result)
    throw new Error('에러요')
    }).catch((err)=>{    //캐치로 잡으면 오류를 제대로 잡음.
    console.log('then err:'+err)
})

//async & await

var user = {
    id:1,
    name:'KJH'
};
if(user.id===1){
    console.log(user.name);
}

function logName(){
    var user = abc('http://naver.com', function(user){
        if(user===1){
            console.log(user.name)
        }
    })
}













