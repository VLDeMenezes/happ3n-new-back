import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  wallet: string;
  @Column()
  role: string;
  @Column()
  imgAvatar: string;
  @Column()
  img: string;
  @Column()
  location: string;
  @Column()
  startDate: Date;
  @Column()
  notification: Array<unknown>;
  @Column()
  socials: Array<unknown>;
  @Column()
  suscribedEvents: Array<unknown>;
  @OneToMany(() => User, (user) => user.ownerEvents)
  ownerEvents: Array<unknown>;
  @OneToMany(() => User, (user) => user.ownerChannels)
  ownerChannels: Array<unknown>;
  @Column()
  ownerHubs: Array<unknown>;
  @Column({ default: false })
  isPremiun: boolean;
}
