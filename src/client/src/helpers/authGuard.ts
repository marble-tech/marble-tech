import jwt from 'jsonwebtoken';

const token_key = 'marble';

const AUTH_SECRET = 'asdfg;lkjh';
export function loggedIn(){
    const token = getToken();
    return !!token;
}
export function setToken(token:any){
    localStorage.setItem(token_key, token)
}
export function getToken(){
    const token = localStorage.getItem(token_key)
    return token;
}
export function removeToken(){
    localStorage.removeItem(token_key);
}
interface Decoded{
    id: number
}

export function getLoggedUser(){
    let token = getToken()
    let user = {id: undefined}
    if (token){
        return jwt.verify(token, AUTH_SECRET, (err,decoded)=>{
            if (err) {
                throw new Error()
              } else {
                    Object.assign(user, decoded)
                    return user.id
              }
        })
    } 
    return null;
}
