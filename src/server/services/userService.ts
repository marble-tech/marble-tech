import { User } from '../entities/User';
import { getUserRepository } from '../repositories/userRepository';
import { getChallengeRepository } from '../repositories/challengeRepository';

/**
 * UserService class
 */
export class UserService {

  /**
   * Default constructor
   */
  public constructor() { }

  /**
   * Create a new user
   * @param newUser 
   */
  public create(newUser: any) {
    // create User object from information provided
    const user = new User(
      newUser.f_name, newUser.l_name,
      newUser.email, newUser.password, newUser.username
    );
    return getUserRepository().save(user);
  }

  /**
   * Save a user to database
   */
  public save(user: User) {
    return getUserRepository().save(user);
  }

  /**
   * Fetch all users from database with
   * its profile image
   */
  public findAll() {
    return getUserRepository().find({ relations: ['profileImage'] });
  }

  /**
   * Fetch a user by its id from database. 
   * Returns its profile image
   * @param id 
   */
  public findById(id: any) {
    return getUserRepository().findOne(id, { relations: ['profileImage'] });
  }

  /**
   * Updates a user in database
   * @param user 
   * @param values 
   */
  public update(user: User, values: any) {
    // determine the keys (properties, fields) available
    const properties = Object.keys(values); 
    // for each property update the value
    properties.forEach(property => { 
      (user as any)[property] = values[property];
    });
    return getUserRepository().save(user);
  }

  /**
   * Delete a user by its id in database
   * @param id 
   */
  public delete(id: number) {
    return getUserRepository().delete(id);
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
      .addSelect('"p"."url"', 'pic') // get pic if existent 
      .innerJoin('users_challenges', 'uc', '"users"."id" = "uc"."userId"') // join with user challenges
      .leftJoin('profile_images', 'p', '"users"."id" = "p"."userId"') // joing with profile_images
      .where('"uc"."score" = 100') // WHERE challenge was solved (score 100)
      .groupBy('"users"."id","username","url"') // group by user
      .orderBy('MAX("uc"."challengeId")', 'DESC') // order by highest challenge id
      .limit(limit)
      .getRawMany() // get raw data instead of entities

    return rank;
  }

  /**
   * Fetch all challenges of a user with its scores
   * @param userId 
   */
  public getChallengesWithScore(userId: number){

    // I couldn't make it work using regular TypeORM functions. So I've implemented manual query.
    // Other problem is it uses ChallengeRepository. So, it might be better to move it to that file later.
    const challenges = getChallengeRepository().query(
      "SELECT DISTINCT \"c\".\"id\", \"c\".\"title\", \"c\".\"description\", \"c\".\"level\", \r\n(SELECT  MAX(\"score\") FROM \"users_challenges\" WHERE (\"userId\" = "+userId+" AND \"challengeId\" = \"c\".\"id\")) as \"maxScore\" FROM \"challenges\" \"c\"\r\n\tLEFT JOIN \"users_challenges\" \"uc\" ON \"uc\".\"challengeId\" = \"c\".\"id\"\r\n\tORDER BY \"c\".\"id\";");
    return challenges;
  }
}