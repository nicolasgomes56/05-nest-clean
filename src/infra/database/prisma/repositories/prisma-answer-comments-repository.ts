import { Injectable } from '@nestjs/common';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author';
import { PrismaAnswerCommentMapper } from '../mappers/prisma-answer-comment-mapper';
import { PrismaQuestionCommentWithAuthorMapper } from '../mappers/prisma-comment-with-author-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAnswerCommentsRepository implements AnswerCommentsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<AnswerComment | null> {
    const answerComment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!answerComment) return null;

    return PrismaAnswerCommentMapper.toDomain(answerComment);
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams): Promise<AnswerComment[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        answerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return comments.map(PrismaAnswerCommentMapper.toDomain);
  }

  async findManyByAnswerIdWithAuthor(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    const answerComments = await this.prisma.comment.findMany({
      where: {
        answerId,
      },
      include: {
        author: true, // Eager load - Relacionamento entre Comment e Student
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return answerComments.map(PrismaQuestionCommentWithAuthorMapper.toDomain);
  }

  async create(answerComment: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPersistence(answerComment);

    await this.prisma.comment.create({
      data,
    });
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: answerComment.id.toString(),
      },
    });
  }
}
