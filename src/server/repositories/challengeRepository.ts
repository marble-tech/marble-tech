import { Challenge } from './../entities/Challenge';
import { getConnection, Repository } from "typeorm";

/**
 * Get Challenge repository
 */
export function getChallengeRepository(): Repository<Challenge>{
  return getConnection().getRepository(Challenge);
}