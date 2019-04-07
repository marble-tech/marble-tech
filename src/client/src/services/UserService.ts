import {ApiService} from '../helpers/api'
import {getLoggedUser} from '../helpers/authGuard'

const api  = new ApiService;

export class UserService {
    domain:string
    constructor(domain?:string){
        this.domain = domain || process.env.REACT_APP_API + '/users'
    }

    public getAll(){
        return api.fetch(this.domain,{
            method:'GET'})
            .then((res:any) => {return res})
    }
    public get(id:number){
        return api.fetch(this.domain+'/'+id,{
            method:'GET'})
            .then((res:any) => {return res})
    }

    public create(newUser:any){
        // Object.assign(newUser, {user: getLoggedUser()})
        // console.log(newUser)
        return api.fetch(this.domain,{
            method:'POST',
            body: JSON.stringify(newUser)
        })
        .then((res:any) => {return res})
    }
    // public delete(id:number){
    //     return api.fetch(this.domain+'/'+id,{
    //         method:'DELETE',
    //     })
    //     .then((res:any) => {return res})
    // }


}