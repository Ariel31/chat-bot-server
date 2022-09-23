import { PartialType } from '@nestjs/mapped-types';
import { createAnswerDto } from './create-answer.dto';

export class UpdateAnswerDto extends PartialType(createAnswerDto) {
  upvotes: number;
  downvotes: number;
  isVotedUp: boolean;
  isVotedDown: boolean;
}
