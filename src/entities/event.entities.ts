import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Channel } from './channel.entities';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventName: string;

  @Column({ nullable: true })
  img: string;

  @ManyToOne(() => Channel, (channel) => channel.events, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'channelId' })
  channel: Channel;

  @Column()
  location: string;

  @Column()
  eventType: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ nullable: true })
  sourceLink: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  timeZone: string;

  @Column()
  isPaid: Boolean;

  @Column('simple-array', { nullable: true })
  toppings: string[];

  @Column('simple-array', { nullable: true })
  guest: string[];
}
