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
    public getRank(){
        return api.fetch(this.domain+'/rank',{
            method:'POST'})
            .then((res:any) => {return res})
    }
    public get(id:number){
        return api.fetch(this.domain+'/'+id,{
            method:'GET'})
            .then((res:any) => {return res})
    }

    public create(newUser:any){
        return api.fetch(this.domain,{
            method:'POST',
            body: JSON.stringify(newUser)
        })
        .then((res:any) => {return res})
    }
    public uploadImage(id:number, image:File){
        return api.fetch(this.domain+'/'+id+'/profileImage',{
            "Content-Type": "multipart/form-data",
            method:'POST',
            file: image
        })
        .then((res:any) => {return res})
    }
    public update(id:number, attUpdate:any){
        return api.fetch(this.domain+'/'+id,{
            method:'PATCH',
            body: JSON.stringify(attUpdate)
        })
        .then((res:any) => {return res})
    }
    public delete(id:number){
        return api.fetch(this.domain+'/'+id,{
            method:'DELETE',
        })
        .then((res:any) => {return res})
    }


}