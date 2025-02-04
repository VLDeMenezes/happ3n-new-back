import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Channel } from './channel.entities';

@Entity()
export class Hub {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  background: string;
  @Column()
  description: string;
  @Column()
  date: Date;
  @OneToOne(() => Channel, (owener) => owener.hub)
  owener: string;
}
