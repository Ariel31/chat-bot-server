import { Message } from 'src/messages/entities/message.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'room_name' })
  roomName: string;

  @OneToMany(() => Message, (message) => message.room, { nullable: true })
  messages: Message[];

  @ManyToMany(() => User, (user) => user.rooms, { nullable: true })
  users: User[];
}
