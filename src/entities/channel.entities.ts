import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Hub } from './hub.entities';
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

  @Column('simple-array')
  tags: string[];

  @Column()
  about: string;

  @Column('jsonb', { nullable: true })
  social: Socials[];

  @Column('jsonb', { nullable: true })
  events: Event[];

  @Column()
  avatar: string;

  @Column('jsonb', { nullable: true })
  data: Data;

  @Column('jsonb', { nullable: true })
  banners: Banner[];

  @OneToMany(() => Hub, (hub) => hub.owener, { nullable: true })
  @JoinColumn({ name: 'hubId' })
  hub: Hub[];
}
