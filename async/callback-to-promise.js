'use strict';

//callback hell, new Promise로 풀기
class UserStorage{
    loginUser(id,password){
        return new Promise((resolve, reject)=>{ //new Promise를 리턴!
            setTimeout(()=>{
                if((id==='kim'&& password==='jh')||
                    (id==='lee'&& password==='sm')) { //로그인이 잘 되면
                    resolve(id) //성공시 아이디를 전달
                }else{
                    reject(new Error('not found')); //실패면 낫파운드뜸
                }
            },2000); //2초있다가..
        })
    }
    getRoles(user){
        return new Promise((resolve, reject)=>{ //받는곳에도 new Promise를 만들고
            setTimeout(()=> {
                if(user === 'kim'){
                    resolve({name:'kim', role:'admin'}) //성공시 네임과 롤을 전달
                }else{
                    reject(new Error('no access')); //실패시 노엑세스가 뜸
                }
            },1000)
        })
    }
}

const userStorage = new UserStorage();
const id = prompt('enter your id');
const password = prompt('enter your password');
userStorage
    .loginUser(id,password)
    .then(userStorage.getRoles)
    .then(user => alert(`hello ${user.name}, you have a ${user.role} role`))
    .catch(console.log)