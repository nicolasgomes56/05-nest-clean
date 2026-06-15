import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaAnswerCommentsRepository } from './repositories/prisma-answer-comments-repository';
import { PrismaAnswerAttachmentsRepository } from './repositories/prisma-anwser-attachments-repository';
import { PrismaAnswersRepository } from './repositories/prisma-anwsers-repository';
import { PrismaQuestionAttachmentsRepository } from './repositories/prisma-question-attachments-repository';
import { PrismaQuestionsCommentsRepository } from './repositories/prisma-questions-comments-repository';
import { PrismaQuestionsRepository } from './repositories/prisma-questions-repository';

@Module({
  providers: [
    PrismaService,
    PrismaQuestionsRepository,
    PrismaQuestionsCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
  exports: [
    PrismaService,
    PrismaQuestionsRepository,
    PrismaQuestionsCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
  // Todo modulo que importar DatabaseModule terá acesso ao PrismaService
})
export class DatabaseModule {}
