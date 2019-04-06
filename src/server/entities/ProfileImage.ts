import { User } from './User';
import { Column, PrimaryGeneratedColumn, OneToOne, Entity, JoinColumn } from 'typeorm';

@Entity('profile_images')
export class ProfileImage {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({nullable: false})
  public url!: string;

  @Column({nullable: false})
  public path!: string;

  @OneToOne(
    type => User, user => user.profileImage,
    {onDelete: 'CASCADE'}
  )
  @JoinColumn()
  public user!: User;

  public constructor(url: string, path: string){
    this.url = url;
    this.path = path;
  }

}