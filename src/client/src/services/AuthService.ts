import * as authGuard from '../helpers/authGuard'
import {ApiService} from '../helpers/api'
import { setAuthToken } from '../lib/components/withAuth/withAuth';

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
                setAuthToken(response.token);
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
        localStorage.removeItem('marbleLoggedUser');
        (async () => {
            await setAuthToken(null);
        })();
    }


}