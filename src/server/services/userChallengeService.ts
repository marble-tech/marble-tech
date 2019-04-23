import { UserChallenge } from '../entities/UserChallenge';
import { getUserChallengeRepository } from "../repositories/userChallengeRepository";

/**
 * User Challenge Service class
 */
export class UserChallengeService {

  /**
   * Default Contructor
   */
  public constructor(){}

  /**
   * Create a new user challenge
   * @param userChallenge 
   */
  public create(userChallenge: UserChallenge){
    return getUserChallengeRepository().save(userChallenge);
  }
}