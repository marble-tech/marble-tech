import { getConnection, Repository } from "typeorm";
import { User } from "../entities/User";

/**
 * Get user repository
 */
export function getUserRepository(): Repository<User> {
    const connection = getConnection();
    const userRepository = connection.getRepository(User);
    return userRepository;
}
