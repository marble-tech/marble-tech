import { ProfileImage } from '../entities/ProfileImage';
import { getConnection } from "typeorm";

/**
 * Get ProfileImage repository
 */
export function profileImageRepository() {
  return getConnection().getRepository(ProfileImage);
}