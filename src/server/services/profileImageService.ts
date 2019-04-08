import { User } from './../entities/User';
import { ProfileImage } from '../entities/ProfileImage';
import { profileImageRepository } from '../repositories/profileImageRepository';

export class ProfileImageService {

  public constructor(){}

  public create(image: ProfileImage, user: User){
    image.user = user;
    return profileImageRepository().save(image);
  }

  public save(image: ProfileImage){
    return profileImageRepository().save(image);
  }

  public findById(id: number){
    return profileImageRepository().findOne(id);
  }

}