import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateQuestionDto } from './dto/create-message.dto';
import { createAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Controller('messages')
export class ChatsController {
  constructor(private readonly chatsService: MessagesService) {}

  @Post()
  create(@Body() createChatDto: CreateQuestionDto) {
    return this.chatsService.createQuestion(createChatDto);
  }

  @Post('addAnswer/:id')
  update(@Param('id') id: string, @Body() createAnswerDto: createAnswerDto) {
    return this.chatsService.addAnswerToQuestion(id, createAnswerDto);
  }

  @Get('search')
  getAnswer(@Query('content') question) {
    return this.chatsService.getAnswer(question);
  }

  @Get(':id')
  getQuestion(@Param('id') id: string) {
    return this.chatsService.getMessageById(id);
  }

  @Patch('updateAnswer/:id')
  updateAnswer(
    @Param('id') id: string,
    @Body() updateAnswerDto: UpdateAnswerDto,
  ) {
    return this.chatsService.updateAnswer(id, updateAnswerDto);
  }
}
