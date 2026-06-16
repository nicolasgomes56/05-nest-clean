import { Module } from '@nestjs/common';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository';
import { PrismaService } from './prisma.service';
import { PrismaAnswerCommentsRepository } from './repositories/prisma-answer-comments-repository';
import { PrismaAnswerAttachmentsRepository } from './repositories/prisma-anwser-attachments-repository';
import { PrismaAnswersRepository } from './repositories/prisma-anwsers-repository';
import { PrismaQuestionAttachmentsRepository } from './repositories/prisma-question-attachments-repository';
import { PrismaQuestionsCommentsRepository } from './repositories/prisma-questions-comments-repository';
import { PrismaQuestionsRepository } from './repositories/prisma-questions-repository';
import { PrismaStudentRepository } from './repositories/pristma-student-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentRepository,
    },
    PrismaQuestionsCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    PrismaQuestionsCommentsRepository,
    PrismaQuestionAttachmentsRepository,
    PrismaAnswersRepository,
    PrismaAnswerCommentsRepository,
    PrismaAnswerAttachmentsRepository,
  ],
  // Todo modulo que importar DatabaseModule terá acesso ao PrismaService
})
export class DatabaseModule {}
