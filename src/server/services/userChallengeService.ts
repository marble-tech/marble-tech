
import { UserChallenge } from '../entities/UserChallenge';
import { getUserChallengeRepository } from "../repositories/userChallengeRepository";
import { User } from '../entities/User';

export class UserChallengeService {

  public constructor(){}

  public create(userChallenge: UserChallenge){
    // try to save to DB
    return getUserChallengeRepository().save(userChallenge);
  }
}