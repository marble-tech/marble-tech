import * as authGuard from '../helpers/authGuard'
import {ApiService} from '../helpers/api'
import { BASE_URL } from '../environment/environment';

const api = new ApiService;

export class AuthService {
    domain:string
    constructor(domain?:string){
        this.domain = domain || BASE_URL + '/auth/login'
    }

    public login(username:any, password:any){
        return api.fetch(this.domain,{
                method:'POST',
                body:JSON.stringify({
                    email: username,
                    password: password
                })
            })
            .then((response:any) => {
                authGuard.setToken(response.token)
                return response;})  
        
        
    }
    public logout(){
        authGuard.removeToken();
    }


}