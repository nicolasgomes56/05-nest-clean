import { Injectable } from '@nestjs/common';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

@Injectable()
export class PrismaQuestionsCommentsRepository implements QuestionCommentsRepository {
  findById(_id: string): Promise<QuestionComment | null> {
    throw new Error('Method not implemented.');
  }
  findManyByQuestionId(_questionId: string, _params: PaginationParams): Promise<QuestionComment[]> {
    throw new Error('Method not implemented.');
  }
  create(_questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(_questionComment: QuestionComment): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
