import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocketService } from 'src/socket/socket.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { createAnswerDto } from './dto/create-answer.dto';
import { CreateQuestionDto } from './dto/create-message.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';
import { Message } from './entities/message.entity';
import MessagesSearchService from './messages-search.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    private userService: UsersService,
    private messagesSearchService: MessagesSearchService,
    private socketService: SocketService,
  ) {}

  async createQuestion(createQuestionDto: CreateQuestionDto) {
    const { fromUserId, roomId } = createQuestionDto;

    const message = this.messageRepository.create({
      ...createQuestionDto,
      from: { id: fromUserId },
      room: { id: roomId },
      isQuestion: true,
    });

    this.socketService.handleNewMessageSent(message);
    return await this.messageRepository.save(message);
  }

  async updateAnswer(id, updateAnswerDto: UpdateAnswerDto) {
    const answer = await this.answerRepository.findOne({
      where: { id },
      relations: ['from'],
    });
    const updatedAnswer = this.answerRepository.save({
      ...answer,
      ...updateAnswerDto,
    });

    if (!updatedAnswer) throw new InternalServerErrorException();

    this.messagesSearchService.update(id, updateAnswerDto);
    return updatedAnswer;
  }

  async addAnswerToQuestion(
    questionId: string,
    createAnswerDto: createAnswerDto,
  ) {
    const { fromUserId } = createAnswerDto;
    const user = await this.userService.findOne(fromUserId);
    const question = await this.messageRepository.findOne({
      where: { id: questionId },
      relations: ['answers'],
    });

    const newAnswer = this.answerRepository.create({
      ...createAnswerDto,
      from: user,
      question,
    });
    question.answers.push(newAnswer);
    const updatedQuestion = await this.messageRepository.save(question);

    this.socketService.handleNewMessageSent(newAnswer);

    if (updatedQuestion) {
      this.messagesSearchService.indexAnswer({
        ...newAnswer,
        question: question.content,
      });
    }
    return newAnswer;
  }

  async getAnswer(content) {
    return this.messagesSearchService.search(content);
  }

  async getMessageById(id) {
    return this.messageRepository.findOne({
      where: { id },
      relations: ['answers', 'from', 'answers.from'],
      order: {
        answers: {
          upvotes: 'DESC',
        },
      },
    });
  }
}
