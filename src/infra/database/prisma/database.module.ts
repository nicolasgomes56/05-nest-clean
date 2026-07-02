import { Module } from '@nestjs/common';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository';
import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository';
import { CacheModule } from '@/infra/cache/cache.module';
import { PrismaService } from './prisma.service';
import { PrismaAnswerCommentsRepository } from './repositories/prisma-answer-comments-repository';
import { PrismaAnswerAttachmentsRepository } from './repositories/prisma-anwser-attachments-repository';
import { PrismaAnswersRepository } from './repositories/prisma-anwsers-repository';
import { PrismaAttachmentsRepository } from './repositories/prisma-attachments-repository';
import { PrismaNotificationsRepository } from './repositories/prisma-notifications-repository';
import { PrismaQuestionAttachmentsRepository } from './repositories/prisma-question-attachments-repository';
import { PrismaQuestionsCommentsRepository } from './repositories/prisma-questions-comments-repository';
import { PrismaQuestionsRepository } from './repositories/prisma-questions-repository';
import { PrismaStudentRepository } from './repositories/pristma-student-repository';

@Module({
  imports: [CacheModule],
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
    {
      provide: QuestionCommentsRepository,
      useClass: PrismaQuestionsCommentsRepository,
    },
    {
      provide: QuestionAttachmentsRepository,
      useClass: PrismaQuestionAttachmentsRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: AnswerCommentsRepository,
      useClass: PrismaAnswerCommentsRepository,
    },
    {
      provide: AnswerAttachmentsRepository,
      useClass: PrismaAnswerAttachmentsRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
    {
      provide: NotificationsRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],
  exports: [
    PrismaService,
    QuestionsRepository,
    StudentsRepository,
    QuestionCommentsRepository,
    QuestionAttachmentsRepository,
    AnswersRepository,
    AnswerCommentsRepository,
    AnswerAttachmentsRepository,
    AttachmentsRepository,
    NotificationsRepository,
  ],
  // Todo modulo que importar DatabaseModule terá acesso ao PrismaService
})
export class DatabaseModule {}
