import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Channel, Socials } from './channel.entities';
import { Event } from './event.entities';

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

  @Column('simple-array')
  notification: string[];

  @Column('jsonb')
  socials: Socials[];

  @ManyToMany(() => Event)
  suscribedEvents: Event[];

  @OneToMany(() => User, (user) => user.ownerEvents)
  ownerEvents: Event[];

  @OneToMany(() => User, (user) => user.ownerChannels)
  ownerChannels: Channel[];

  @Column('simple-array')
  ownerHubs: string[];

  @Column({ default: false })
  isPremiun: boolean;
}
