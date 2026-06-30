import { Global, Module } from '@nestjs/common';
import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created';
import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen';
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification';
import { DatabaseModule } from '../database/prisma/database.module';

@Global()
@Module({
  imports: [DatabaseModule],
  providers: [OnAnswerCreated, OnQuestionBestAnswerChosen, SendNotificationUseCase],
})
export class EventsModule {}
