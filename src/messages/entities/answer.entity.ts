import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  answer: string;

  @Column({ default: 0 })
  downvotes: number;

  @Column({ default: 0 })
  upvotes: number;

  @Column({ default: false, name: 'is_voted_up' })
  isVotedUp: boolean;

  @Column({ default: false, name: 'is_voted_down' })
  isVotedDown: boolean;

  @ManyToOne(() => Message, (question) => question.answers)
  question: Message;

  @ManyToOne(() => User, (user) => user.answers, { cascade: true })
  from: User;

  @CreateDateColumn()
  created_at: Date;
}
