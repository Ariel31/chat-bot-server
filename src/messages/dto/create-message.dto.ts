export class CreateQuestionDto {
  fromUserId: string;
  roomId: string;
  content: string;
  isQuestion: boolean = true;
}
