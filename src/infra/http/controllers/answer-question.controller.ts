import { BadRequestException, Body, Controller, HttpCode, Param, Post } from '@nestjs/common';
import z from 'zod';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import type { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const createQuestionBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.uuid()),
});
const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller('/questions/:questionId/answers')
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('questionId') questionId: string,
  ) {
    const { content, attachments } = body;
    const userId = user.sub;

    const result = await this.answerQuestion.execute({
      questionId,
      content,
      authorId: userId,
      attachmentsIds: attachments,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
