import {ApiService} from '../helpers/api'
import {getLoggedUser} from '../helpers/authGuard'

const api  = new ApiService;

export class ChallengeService {
    domain:string
    constructor(domain?:string){
        this.domain = domain || process.env.REACT_APP_API + '/challenges'
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
    public test(id:number, challengeAns:any){
        return api.fetch(this.domain+`/${id}/test`,{
            "Content-Type": "application/json",
            method:'POST',
            body: challengeAns
        })
        .then((res:any) => {return res})
    }
}