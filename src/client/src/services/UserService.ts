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
        let data = new FormData()
        data.append("profileImage", image)
        return api.fetch(this.domain+'/'+id+'/profileImage',{
            method:'POST',
            body: data
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
    public getChallenges(id:number){
        return api.fetch(this.domain+'/challenges',{
            method:'POST'})
            .then((res:any) => {return res})
    }



}