import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserChallenge } from "./UserChallenge";

export enum ChallengeLevel {
  BASIC = "basic",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced"
}

export enum ChallengeStatus {
  TODO = "todo",
  ATTEMPTED = "attempted",
  PASSED = "passed"
}

@Entity('challenges')
export class Challenge {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({nullable: false})
  public title!: string;

  @Column({nullable: false, type: "text"})
  public description!: string;

  @Column({nullable: false, type: "text"})
  public appFile!: string;

  @Column({nullable: false, type: "text"})
  public testFile!: string;

  @Column({nullable: true, type: 'text'})
  public startingCode!: string;

  @Column({nullable: false, type: "text"})
  public sampleAnswer!: string;

  @OneToMany(type => UserChallenge, UserChallenge => UserChallenge.challenge)
  public attempts!: UserChallenge[];

  @Column({
    nullable: false,
    type: 'enum',
    enum: ChallengeLevel,
    default: ChallengeLevel.INTERMEDIATE
  })
  public level!: string;

  public constructor(
    title: string,
    description: string,
    sampleAnswer: string,
    level: string,
    appFile: string,
    testFile: string
  ){
    this.title = title;
    this.description = description;
    this.sampleAnswer = sampleAnswer;
    this.level = level;
    this.appFile = appFile;
    this.testFile = testFile;
  }

}