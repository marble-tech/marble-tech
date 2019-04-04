import { Challenge } from './../entities/Challenge';
import { getConnection, Repository } from "typeorm";

export function getChallengeRepository(): Repository<Challenge>{
  return getConnection().getRepository(Challenge);
}