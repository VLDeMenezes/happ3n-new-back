import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  type: string;
  @Column()
  message: string;
  @Column()
  result: boolean;
  //chequear si es necesario agregar mas campos
}
