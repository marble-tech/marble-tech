import * as jwt from 'jsonwebtoken';
import { getUserRepository } from '../repositories/userRepository';

/**
 * Auth Service class
 */
export class AuthService {

  /**
   * Default constructor
   */
  public constructor(){}

  /**
   * Gets decoded token information
   * @param token 
   */
  public getDecodedToken(token: any) {
    const decoded = jwt.decode(token);
    return decoded;
  }

  /**
   * Fetch a user with its profile image 
   * from its authentication token
   * @param token 
   */
  public getAuthUserByToken(token: any){ 
    const userId = (this.getDecodedToken(token) as any).id;
    const user = getUserRepository().findOne(userId, {relations: ['profileImage']});
    return user;
  }

}