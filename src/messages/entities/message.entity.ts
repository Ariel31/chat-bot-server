import { Room } from 'src/rooms/entities/room.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.messages, { cascade: true })
  from: User;

  @ManyToOne(() => Room, (room) => room.messages, { cascade: true })
  room: Room;

  @Column()
  content: string;

  @Column()
  isQuestion: boolean;

  @OneToMany(() => Answer, (answer) => answer.question, {
    nullable: true,
    cascade: true,
  })
  answers: Answer[];

  @CreateDateColumn()
  created_at: Date;
}
