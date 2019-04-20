import { Entity, PrimaryGeneratedColumn, Column, Index, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn, Unique } from "typeorm";
import { Challenge, ChallengeLevel, ChallengeStatus } from "./Challenge";
import { User } from "./User";

/**
 * User Challenge class
 */
@Entity('users_challenges')
@Unique(['user', 'challenge', 'date'])
export class UserChallenge {

  @ManyToOne(type => User, user => user.challenges)
  public user!: User;

  @ManyToOne(type => Challenge, challenge => challenge.attempts)
  public challenge!: Challenge;

  @PrimaryColumn({nullable: false, name: 'date', type: 'timestamp'})
  public date!: Date;

  @Column({type: 'int'})
  public score!: number;

  @Column({nullable: false})
  public user_attempt!: string;

  public constructor(
    user: User,
    challenge: Challenge,
    date: Date,
    score: number,
    user_attempt: string
  ){
    this.user = user;
    this.challenge = challenge;
    this.date = date;
    this.score = score;
    this.user_attempt = user_attempt;
  }

}

export interface UserDashboardChallengeEntry{
  id: number,
  title: string,
  description: string,
  level: ChallengeLevel,
  maxScore?: number,
  status?: ChallengeStatus
}