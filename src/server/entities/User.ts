import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserChallenge } from './UserChallenge';

@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({nullable: false})
  public f_name!: string;

  @Column({nullable: false})
  public l_name!: string;

  @Column({nullable: false, unique: true, readonly: true})
  public email!: string;

  @Column({nullable: false})
  public password!: string;

  @OneToMany(type => UserChallenge, UserChallenge => UserChallenge.user)
  public challenges!: UserChallenge[];

  public constructor(
    f_name: string,
    l_name: string,
    email: string,
    password: string
  ){
    this.f_name = f_name;
    this.l_name = l_name;
    this.email = email;
    this.password = password;
  }

}