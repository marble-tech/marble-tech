import { ProfileImage } from '../entities/ProfileImage';
import { getConnection } from "typeorm";

export function profileImageRepository() {
  return getConnection().getRepository(ProfileImage);
}