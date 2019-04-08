import { ProfileImage } from './../entities/ProfileImage';
import { User } from '../entities/User';
import { getUserRepository } from '../repositories/userRepository';

// ask remo!

export class UserService {

  public constructor(){}

  public create(newUser: any){ 
    // create User object from information provided
    const user = new User(
      newUser.f_name, newUser.l_name, 
      newUser.email, newUser.password
      );
    return getUserRepository().save(user);// save user to DB
  }

  public save(user: User){
    return getUserRepository().save(user);
  }

  public findAll(){
    // add other relations
    return getUserRepository().find();
  }

  public findById(id: number){
    // add other relations
    return getUserRepository().findOne(id, {relations: ['profileImage']});
  }

  public update(user: User, values: any){
    const properties = Object.keys(values); // determine the keys (properties, fields) available
    properties.forEach(property => { // for each property 
      (user as any)[property] = values[property]; // update User information
    });
    return getUserRepository().save(user); // save updated user
  }

  public delete(id: number){
    return getUserRepository().delete(id);
  }


}