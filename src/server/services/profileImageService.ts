import { User } from './../entities/User';
import { ProfileImage } from '../entities/ProfileImage';
import { profileImageRepository } from '../repositories/profileImageRepository';

/**
 * Profile Image Service class
 */
export class ProfileImageService {

  /**
   * Default Constructor
   */
  public constructor(){}

  /**
   * Creates a new profile image
   * @param image 
   * @param user 
   */
  public create(image: ProfileImage, user: User){
    image.user = user;
    return profileImageRepository().save(image);
  }

  /**
   * Save a profile image in database
   * @param image 
   */
  public save(image: ProfileImage){
    return profileImageRepository().save(image);
  }

  /**
   * Find a profile image by id in database
   * @param id 
   */
  public findById(id: number){
    return profileImageRepository().findOne(id);
  }

}