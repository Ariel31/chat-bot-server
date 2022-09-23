import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { ChatsController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import MessagesSearchService from './messages-search.service';
import { SearchModule } from 'src/search/search.module';
import { Answer } from './entities/answer.entity';
import { UsersModule } from 'src/users/users.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Answer]),
    SearchModule,
    UsersModule,
    SocketModule,
  ],
  controllers: [ChatsController],
  providers: [MessagesService, MessagesSearchService],
  exports: [MessagesService],
})
export class ChatsModule {}
