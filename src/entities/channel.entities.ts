import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hub } from './hub.entities';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  channelName: string;

  @Column()
  background: string;

  @Column()
  location: string;

  @Column('simple-array')
  tags: string[];

  @Column()
  about: string;

  @Column('jsonb')
  social: Socials[];

  @Column('jsonb')
  events: Event[];

  @Column()
  avatar: string;

  @Column('jsonb')
  data: Data;

  @Column('jsonb')
  banners: Banner[];

  @OneToMany(() => Hub, (hub) => hub.owener, { nullable: true })
  hub: Hub[];
}

class Banner {
  id: string;
  title: string;
  img: string;
}

class Socials {
  name: string;
  link: string;
}

class Data {
  trending: string;
  visualization: string;
  engagement: string;
}
