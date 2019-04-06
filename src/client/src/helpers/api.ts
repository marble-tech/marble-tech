import * as authGuard from './authGuard';
import * as message from './messagesHelper';

export class ApiService {
    
    fetch (url:string, options:any):any {
        const headers:any = {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
        if(authGuard.loggedIn()){
            headers['x-auth-token'] = authGuard.getToken();
        }
        return fetch(url,{
            ...options,
            headers
        })
        .then(message._checkStatus)
        .then((response:any) => response.json())

    }
}