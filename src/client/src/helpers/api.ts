import * as authGuard from './authGuard';
import * as message from './messagesHelper';

export class ApiService {
    
    fetch (url:string, options:any):any {
        let headers:any= {};
        // if content type is not defined
        if(!options['Content-Type']){
            headers = {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }
        if(authGuard.loggedIn()){
            headers['x-auth-token'] = authGuard.getToken();
        }
        console.log(options)
        return fetch(url,{
            ...options,
            headers
        })
        .then(message._checkStatus)
        .then((response:any) => response.json())

    }
}