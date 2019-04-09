import { Challenge } from './../entities/Challenge';
import { getChallengeRepository } from "../repositories/challengeRepository";

export class ChallengeService {

  public constructor(){}

  public create(challengeInfo: any){
    const title = challengeInfo.title;
    const description = challengeInfo.description;
    const sampleAnswer = challengeInfo.sampleAnswer;
    const level = challengeInfo.level;
    const appFile = challengeInfo.appFile;
    const testFile = challengeInfo.testFile;

    const challengeToSave = new Challenge(title, description, sampleAnswer, level, appFile, testFile);
    
    return getChallengeRepository().save(challengeToSave);
  }

  public findAll(){
    return getChallengeRepository().find({order: {id:'ASC'}});
  }

  public findById(id: number){
    return getChallengeRepository().findOne(id);
  }

  public update(challenge: Challenge, values: any){
    const properties = Object.keys(values); // determine the keys (properties, fields) available
    properties.forEach(property => { // for each property 
      (challenge as any)[property] = values[property]; // update Challenge information
    });
    return getChallengeRepository().save(challenge); // save updated user
  }

  public delete(id: number){
    return getChallengeRepository().delete(id);
  }

}