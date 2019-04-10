import * as jwt from 'jsonwebtoken';
import { ProfileImage } from './../entities/ProfileImage';
import { User } from '../entities/User';
import { getUserRepository } from '../repositories/userRepository';

export class AuthService {

  public constructor(){}

  public getDecodedToken(token: any) {
    const decoded = jwt.decode(token);
    return decoded;
  }

  public getAuthUserByToken(token: any){ 
    const userId = (this.getDecodedToken(token) as any).id;
    console.log(userId);
    const user = getUserRepository().findOne(userId, {relations: ['profileImage']});
    return user;
  }

}