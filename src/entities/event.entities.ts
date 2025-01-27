import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  eventName: string;
  @Column()
  img: string;
  @Column()
  channel: string;
  @Column()
  location: string;
  @Column()
  eventType: string;
  @Column()
  startDate: Date;
  @Column()
  endDate: Date;
  @Column()
  sourceLink: string;
  @Column()
  description: string;
  @Column()
  timeZone: string;
  @Column()
  price: string;
  @Column()
  toppings: string[];
  @Column()
  guest: string[];
}
