import { BadRequestException, Body, Controller, HttpCode, Param, Put } from '@nestjs/common';
import z from 'zod';
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer';
import { CurrentUser } from '@/infra/auth/current-user-decorator';
import type { UserPayload } from '@/infra/auth/jwt.strategy';
import { ZodValidationPipe } from '../pipes/zod-validation-pipe';

const createQuestionBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.uuid()),
});
const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>;

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private editQuestion: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
    @Param('id') answerId: string,
  ) {
    const { content, attachments } = body;
    const userId = user.sub;

    const result = await this.editQuestion.execute({
      content,
      answerId,
      authorId: userId,
      attachmentsIds: attachments,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
