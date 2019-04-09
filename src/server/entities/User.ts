import { ProfileImage } from './ProfileImage';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from "typeorm";
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

  @Column({nullable: false, unique: true})
  public username!: string;

  @Column({nullable: false})
  public password!: string;

  @OneToMany(type => UserChallenge, UserChallenge => UserChallenge.user)
  public challenges!: UserChallenge[];

  @OneToOne(type => ProfileImage, profileImage => profileImage.user)
  public profileImage!: ProfileImage

  public constructor(
    f_name: string,
    l_name: string,
    email: string,
    password: string,
    username: string
  ){
    this.f_name = f_name;
    this.l_name = l_name;
    this.email = email;
    this.password = password;
    this.username = username;
  }

}