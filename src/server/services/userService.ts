import { ProfileImage } from './../entities/ProfileImage';
import { User } from '../entities/User';
import { getUserRepository } from '../repositories/userRepository';

// ask remo!

export class UserService {

  public constructor() { }

  public create(newUser: any) {
    // create User object from information provided
    const user = new User(
      newUser.f_name, newUser.l_name,
      newUser.email, newUser.password, newUser.username
    );
    return getUserRepository().save(user);// save user to DB
  }

  public save(user: User) {
    return getUserRepository().save(user);
  }

  public findAll() {
    // add other relations
    return getUserRepository().find({ relations: ['profileImage'] });
  }

  public findById(id: number) {
    // add other relations
    return getUserRepository().findOne(id, { relations: ['profileImage'] });
  }

  public update(user: User, values: any) {
    const properties = Object.keys(values); // determine the keys (properties, fields) available
    properties.forEach(property => { // for each property 
      (user as any)[property] = values[property]; // update User information
    });
    return getUserRepository().save(user); // save updated user
  }

  public delete(id: number) {
    return getUserRepository().delete(id);

    // list.sort((a, b) => (a.size > b.size) ? 1 : -1)
  }


  /**
   * Function to retrieve the whole rank (containing all users).
   */
  public getWholeRank() {

    const rank = getUserRepository()
      .createQueryBuilder('users') // relation users
      .select("users.id", 'id') // get id
      .addSelect("users.username", 'username') // get username
      .addSelect('MAX("uc"."challengeId")', 'challenges') // get the higher challenge number (where clause will get only passed ones)
      .addSelect('"p"."url"', 'pic') // get pics if existent 
      .innerJoin('users_challenges', 'uc', '"users"."id" = "uc"."userId"') // join with user challenges
      .leftJoin('profile_images', 'p', '"users"."id" = "p"."userId"') // joing with profile_images
      .where('"uc"."score" = 100') // WHERE challenge was solves (score 100)
      .groupBy('"users"."id","username","url"') // group by user
      .orderBy('MAX("uc"."challengeId")', 'DESC') // order by highest challenge id
      .getRawMany() // get raw data instead of entities

    return rank;

  }

  /**
   * Function to retrieve the first N users of the rank
   * @param limit number of users to retrieve
   */
  public getRank(limit: number) {
    const rank = getUserRepository()
      .createQueryBuilder('users') // relation users
      .select("users.id", 'id') // get id
      .addSelect("users.username", 'username') // get username
      .addSelect('MAX("uc"."challengeId")', 'challenges') // get the higher challenge number (where clause will get only passed ones)
      .addSelect('"p"."url"', 'pic') // get pics if existent 
      .innerJoin('users_challenges', 'uc', '"users"."id" = "uc"."userId"') // join with user challenges
      .leftJoin('profile_images', 'p', '"users"."id" = "p"."userId"') // joing with profile_images
      .where('"uc"."score" = 100') // WHERE challenge was solves (score 100)
      .groupBy('"users"."id","username","url"') // group by user
      .orderBy('MAX("uc"."challengeId")', 'DESC') // order by highest challenge id
      .limit(limit)
      .getRawMany() // get raw data instead of entities
    return rank;

  }

}