import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hub } from './hub.entities';
import { Event } from './event.entities';

class Banner {
  id: string;
  title: string;
  img: string;
}

export class Socials {
  name: string;
  link: string;
}

class Data {
  trending: string;
  visualization: string;
  engagement: string;
}

@Entity()
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  channelName: string;

  @Column({ nullable: true })
  background: string;

  @Column()
  location: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ type: 'text' })
  about: string;

  @Column('jsonb', { nullable: true })
  social: Socials[];

  @Column({ nullable: true })
  avatar: string;

  @Column('jsonb', { nullable: true })
  data: Data;

  @Column('jsonb', { nullable: true })
  banners: Banner[];

  @OneToMany(() => Event, (event) => event.channel, { cascade: true })
  events: Event[];

  @OneToMany(() => Hub, (hub) => hub.owener, { nullable: true })
  hub: Hub[];
}
