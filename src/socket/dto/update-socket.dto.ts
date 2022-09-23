import { PartialType } from '@nestjs/mapped-types';
import { SendMessageDto } from './send-message.dto';

export class UpdateSocketDto extends PartialType(SendMessageDto) {
  id: number;
}
