import { User } from './User';
import { Column, PrimaryGeneratedColumn, OneToOne, Entity, JoinColumn } from 'typeorm';

/**
 * ProfileImage class
 */
@Entity('profile_images')
export class ProfileImage {

  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({nullable: false, type: 'text'})
  public url!: string;

  @OneToOne(
    type => User, user => user.profileImage,
    {onDelete: 'CASCADE'}
  )
  @JoinColumn()
  public user!: User;

  public constructor(url: string){
    this.url = url;
  }

}