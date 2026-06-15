import { Injectable } from '@nestjs/common';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) return null;

    return PrismaQuestionMapper.toDomain(question);
  }

  findBySlug(_slug: string): Promise<Question | null> {
    return null;
  }
  findManyRecent(_params: PaginationParams): Promise<Question[]> {
    throw new Error('Method not implemented.');
  }
  save(_question: Question): Promise<void> {
    throw new Error('Method not implemented.');
  }
  create(_question: Question): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(_question: Question): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
