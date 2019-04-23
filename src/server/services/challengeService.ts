import { Challenge } from './../entities/Challenge';
import { getChallengeRepository } from "../repositories/challengeRepository";

/**
 * Challenge Service class
 */
export class ChallengeService {

  /**
   * Default constructor
   */
  public constructor(){}

  /**
   * Create a new challenge in database
   * @param challengeInfo 
   */
  public create(challengeInfo: any){
    const title = challengeInfo.title;
    const description = challengeInfo.description;
    const sampleAnswer = challengeInfo.sampleAnswer;
    const level = challengeInfo.level;
    const appFile = challengeInfo.appFile;
    const testFile = challengeInfo.testFile;
    const startingCode = challengeInfo.startingCode;

    const challengeToSave = new Challenge(title, description, sampleAnswer, level, appFile, testFile);
    
    return getChallengeRepository().save(challengeToSave);
  }

  /**
   * Fetch all challenges in database
   */
  public findAll(){
    return getChallengeRepository().find({order: {id:'ASC'}});
  }

  /**
   * Fetch a challenge by its id
   * @param id 
   */
  public findById(id: number){
    return getChallengeRepository().findOne(id);
  }

  /**
   * Update a challenge in database
   * @param challenge 
   * @param values 
   */
  public update(challenge: Challenge, values: any){
    const properties = Object.keys(values); // determine the keys (properties, fields) available
    properties.forEach(property => { // for each property 
      (challenge as any)[property] = values[property]; // update Challenge information
    });
    return getChallengeRepository().save(challenge); // save updated user
  }

  /**
   * Delete a challenge by its id from database
   * @param id 
   */
  public delete(id: number){
    return getChallengeRepository().delete(id);
  }

}