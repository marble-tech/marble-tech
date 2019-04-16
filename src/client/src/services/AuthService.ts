import * as authGuard from '../helpers/authGuard'
import {ApiService} from '../helpers/api'

const api = new ApiService;

export class AuthService {
    domain:string
    constructor(domain?:string){
        this.domain = domain || process.env.REACT_APP_API + '/auth'
    }

    public login(username:any, password:any){
        return api.fetch(this.domain+'/login',{
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
    public authUser(){
        return api.fetch(this.domain+'/authUser',{
                method:'GET'
            })
            .then((response:any) => {
                return response})  
        
        
    }
    public logout(){
        authGuard.removeToken();
    }


}