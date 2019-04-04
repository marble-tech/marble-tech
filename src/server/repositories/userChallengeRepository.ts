import { getConnection, Repository } from "typeorm";
import { UserChallenge } from "../entities/UserChallenge";

export function getUserChallengeRepository(): Repository<UserChallenge> {
    const connection = getConnection();
    return connection.getRepository(UserChallenge);
}
