import { Injectable } from '@nestjs/common';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';

@Injectable()
export class PrismaAnswerAttachmentsRepository implements AnswerAttachmentsRepository {
  deleteManyByAnswerId(_answerId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findManyByAnswerId(_answerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.');
  }
}
