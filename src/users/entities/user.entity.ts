import { Answer } from 'src/messages/entities/answer.entity';
import { Message } from 'src/messages/entities/message.entity';
import { Room } from 'src/rooms/entities/room.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userName: string;

  @OneToMany(() => Message, (message) => message.from, { nullable: true })
  messages: Message[];

  @OneToMany(() => Answer, (answer) => answer.from, { nullable: true })
  answers: Answer[];

  @ManyToMany(() => Room, (room) => room.users, { nullable: true })
  @JoinTable()
  rooms: Room[];
}
