import { Injectable } from '@nestjs/common';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';

@Injectable()
export class PrismaAnswersRepository implements AnswersRepository {
  save(_answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(_id: string): Promise<Answer | null> {
    throw new Error('Method not implemented.');
  }
  findManyByQuestionId(_questionId: string, _params: PaginationParams): Promise<Answer[]> {
    throw new Error('Method not implemented.');
  }
  create(_answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(_answer: Answer): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
